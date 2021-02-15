class Group {
    constructor(leader, members, prepayments) {
        this.leader = leader;
        this.members = parseInt(members);
        this.prepayments = parseFloat(prepayments) * 10000;
    }

    toJSON() {
        return {
            leader: this.leader,
            members: this.members,
            prepayments: this.prepayments
        };
    }
}

class Record {
    constructor() {
        this.create = Date.now();
        this.members = 0;
        this.prepayments = 0;
        this.groups = {};
    }

    getMembers = () => {
        return this.members;
    }

    getGroups = () => {
        return this.groups;
    }

    addGroup = group => {
        if (this.groups.hasOwnProperty(group.leader)) {
            return false;
        }

        this.groups[group.leader] = group;
        this.members += group.members;
        this.prepayments += group.prepayments;
        return true;
    }
    
    removeGroup = leader => {
        if (!this.groups.hasOwnProperty(leader)) {
            return false;
        }

        const group = this.groups[leader];
        this.members -= group.members;
        this.prepayments -= group.prepayments;
        delete this.groups[group.leader];
        return true;
    }
    
    calculate = () => {
        const _this = this;
        const eachMember = this.prepayments / this.members;

        Object.keys(this.groups).forEach(function (leader) {
            const group = _this.groups[leader];
            group.diff = group.prepayments - (eachMember * group.members);
        });

        const sortedGroups = Object.keys(this.groups).map(function (leader) {
            return [leader, _this.groups[leader].diff];
        });
        sortedGroups.sort(function (first, second) {
            return second[1] - first[1];
        });

        const positiveGroups = [];
        const negativeGroups = [];
        for (let index = 0; index < sortedGroups.length; index++) {
            const leader = sortedGroups[index][0];
            const diff = sortedGroups[index][1];
            if (diff > 0) {
                positiveGroups.push(leader);
            } else if (diff < 0) {
                negativeGroups.push(leader);
            }
        }

        let patches = [];
        for (let pi = 0; pi < positiveGroups.length; pi++) {
            const pg = this.groups[positiveGroups[pi]];
            for (let ni = negativeGroups.length - 1; ni >= 0; ni--) {
                const ng = this.groups[negativeGroups[ni]];
                if (ng.diff === 0) {
                    continue;
                }

                const newDiff = pg.diff + ng.diff;
                if (newDiff >= 0) {
                    patches.push({ from: ng.leader, to: pg.leader, amount: (Math.abs(ng.diff) / 10000).toFixed(2) });
                    pg.diff += ng.diff;
                    ng.diff = 0;
                } else {
                    patches.push({ from: ng.leader, to: pg.leader, amount: (pg.diff / 10000).toFixed(2) });
                    ng.diff += pg.diff;
                    pg.diff = 0;
                }

                if (pg.diff === 0) {
                    break;
                }
            }
        }

        return {
            members: this.members,
            prepayments: (this.prepayments / 10000).toFixed(2),
            payment: (eachMember / 10000).toFixed(2),
            patches: patches,
        };
    }

    save = () => {
        const records = wx.getStorageSync('duo-records') || [];
        records.push(this);
        wx.setStorageSync('duo-records', records);
    }
}


export { Record, Group }