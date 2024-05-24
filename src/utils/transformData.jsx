const transformData = (data) => {
    const result = [];

    data.forEach(item => {
        let congregation = result.find(c => c.congregation.OverseerShip === item.OverseerShip);
        if (!congregation) {
            congregation = {
                congregation: {
                    OverseerShip: item.OverseerShip,
                    ElderShip: {}
                }
            };
            result.push(congregation);
        }

        if (!congregation.congregation.ElderShip[item.ElderShip]) {
            congregation.congregation.ElderShip[item.ElderShip] = {
                OverseerShip: item.OverseerShip,
                ElderShip: item.ElderShip,
                RsdntCongrName: item.RsdntCongrName,
                priests: []
            };
        }

        let elderShip = congregation.congregation.ElderShip[item.ElderShip];
        let priestShip = elderShip.priests.find(p => p.prstAdminSortName === item.prstAdminSortName);
        if (!priestShip) {
            priestShip = {
                prstAdminSortName: item.prstAdminSortName,
                families: {}
            };
            elderShip.priests.push(priestShip);
        }

        if (!priestShip.families[item.Surname]) {
            priestShip.families[item.Surname] = {
                MemAddress: item.MemAddress || "Address not provided",
                members: []
            };
        }

        priestShip.families[item.Surname].members.push({
            IDNO: item.IDNO,
            Surname: item.Surname,
            Name1: item.Name1,
            Name2: item.Name2,
            Birthdate: item.Birthdate.trim(),
            Age: item.Age,
            CenGroup: item.CenGroup,
            Gender: item.Gender
        });
    });

    return result;
};

export default transformData;
