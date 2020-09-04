class Global {

    //#region Default profile settings
    static GATHER_MIN_TIER = 4;
    static GATHER_MAX_TIER = 6;
    static GATHER_MIN_ENCH = 1;
    static GATHER_MAX_ENCH = 2;

    static GATHER_SKIP = {
        W_LOW: 0,
        W_HIGH: 4,
        S_LOW: 0,
        S_HIGH: 4,
        C_LOW: 0,
        C_HIGH: 4,
    };

    static DROPS_SKIP = {
        W_LOW: 0,
        W_HIGH: 2,
        S_LOW: 0,
        S_HIGH: 3,
        C_LOW: 0,
        C_HIGH: 2,
    };
    //#endregion



    //#region Localization
    static TITLE_WEIGHT = 'Silver per 1 kg';
    static TITLE_STACK = 'Silver per 999 stack';
    static TITLE_COEFF = 'Coefficiency';
    static TITLE_ENTRY = 'Item';
    static TEMPLATE_CUSTOM = (item, stackValue, quantity, weightValue) => `<br>${item} = ${stackValue} silver per stack of ${quantity} and ${weightValue} silver per 1kg`;
    static TEMPLATE_RAW = (item, value, title) => `<br>${item} = ${value} ${title}`;
    static TEMPLATE_SKIP = (data) => `<b>${data}</b>`;
    //#endregion
           
    //#region HTML DIV Ids
    static DIV_CUSTOM = 'custom';

    static DIV_GATHER_W = 'gatherWeight';
    static DIV_GATHER_S = 'gatherStack';
    static DIV_GATHER_C = 'gatherCoeff';
    static DIV_GATHER_W_RAW = 'gWData';
    static DIV_GATHER_S_RAW = 'gSData';
    static DIV_GATHER_C_RAW = 'gCData';
           
    static DIV_DROPS_W = 'dropsWeight';
    static DIV_DROPS_S = 'dropsStack';
    static DIV_DROPS_C = 'dropsCoeff';
    static DIV_DROPS_W_RAW = 'dWData';
    static DIV_DROPS_S_RAW = 'dSData';
    static DIV_DROPS_C_RAW = 'dCData';
    //#endregion

    //#region Config
    static FOLDER_ITEMS = '/items/';
    //#endregion
           
    //#region API Parse
    static TEMPLATE_API_BASE = (items, cities) => `https://www.albion-online-data.com/api/v2/stats/prices/${items}?locations=${cities}`
    static TEMPLATE_API_QUALITIES = (qualities) => `&qualities=${qualities}`;
    static TEMPLATE_ITEM = (tier, item) => `T${tier}_${item}`;
    static TEMPLATE_ENCH = (item, enchant) => `${item}_LEVEL${enchant}@${enchant}`;
    static ENCH_ID = '_LEVEL';
    static ENCH_ID_SECOND = '@';
    static ITEM_ID = 'item_id';
    static BUY_PRICE_MAX = 'buy_price_max';
    static SELL_PRICE_MIN = 'sell_price_min';
           
    static ROYAL_CITIES = ['Thetford','FortSterling','Lymhurst','Bridgewatch','Martlock'];
    static DEFAULT_QUALITIES = '1,2,3';
           
    static RELICS_RUNES_SOULS = ['T4_RUNE','T5_RUNE','T6_RUNE','T7_RUNE','T8_RUNE','T4_SOUL','T5_SOUL','T6_SOUL','T7_SOUL','T8_SOUL','T4_RELIC','T5_RELIC','T6_RELIC','T7_RELIC','T8_RELIC'];
    static GATHER_TYPES = ['WOOD','ROCK','HIDE','ORE','FIBER'];
    static REFINED_TYPES = ['PLANKS', 'STONEBLOCK','LEATHER','METALBAR','CLOTH'];
    //#endregion
}