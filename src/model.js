class Model {

    static handleCustom = function(items, quantity) {
        getJSON(
            Global.TEMPLATE_API_BASE(
                this.items = items,
                this.cities = Global.ROYAL_CITIES.join()
            )+Global.TEMPLATE_API_QUALITIES(
                this.qualities = Global.DEFAULT_QUALITIES
            ),
            returnData => View.drawCustom(this.processData(returnData), quantity)
        );
    };

    static handleDrops = function() {
        getJSON(
            Global.TEMPLATE_API_BASE(
                this.items = Global.RELICS_RUNES_SOULS.join(), 
                this.cities = Global.ROYAL_CITIES.join()
            ),
            returnData => {
                var items = this.processData(returnData);

                View.drawData(items, "valueByWeight", 
                    Global.TITLE_WEIGHT, Global.DIV_DROPS_W, Global.DIV_DROPS_W_RAW, 
                    Global.DROPS_SKIP.W_LOW, Global.DROPS_SKIP.W_HIGH);
                View.drawData(items, "stackValue", 
                    Global.TITLE_STACK, Global.DIV_DROPS_S, Global.DIV_DROPS_S_RAW, 
                    Global.DROPS_SKIP.S_LOW, Global.DROPS_SKIP.S_HIGH);
                View.drawData(items, "coefficiency", 
                    Global.TITLE_COEFF, Global.DIV_DROPS_C, Global.DIV_DROPS_C_RAW, 
                    Global.DROPS_SKIP.C_LOW, Global.DROPS_SKIP.C_HIGH);
            }
        );
    };

    static handleGathering = function() {
        var flat = [];
        for (let tier = Global.GATHER_MIN_TIER; tier < Global.GATHER_MAX_TIER+1; tier++) {
            Global.GATHER_TYPES.forEach(item => 
                flat.push(Global.TEMPLATE_ITEM(tier, item))
            );
        }

        var enchanted = [];
        for (let enchant = Global.GATHER_MIN_ENCH; enchant < Global.GATHER_MAX_ENCH+1; enchant++) {
            flat.forEach(item => enchanted.push(
                Global.TEMPLATE_ENCH(item, enchant)
            ));
        }
        
        var items = flat.concat(enchanted).join();
        getJSON(
            Global.TEMPLATE_API_BASE(
                this.items = items, 
                this.cities = Global.ROYAL_CITIES.join()
            ),
            returnData => {
                var items = this.processData(returnData);

                View.drawData(items, "valueByWeight", 
                    Global.TITLE_WEIGHT, Global.DIV_GATHER_W, Global.DIV_GATHER_W_RAW, 
                    Global.GATHER_SKIP.W_LOW, Global.GATHER_SKIP.W_HIGH);
                View.drawData(items, "stackValue", 
                    Global.TITLE_STACK, Global.DIV_GATHER_S, Global.DIV_GATHER_S_RAW, 
                    Global.GATHER_SKIP.S_LOW, Global.GATHER_SKIP.S_HIGH);
                View.drawData(items, "coefficiency", 
                    Global.TITLE_COEFF, Global.DIV_GATHER_C, Global.DIV_GATHER_C_RAW, 
                    Global.GATHER_SKIP.C_LOW, Global.GATHER_SKIP.C_HIGH);
            }
        );
    };

    static getWeight = function(itemId) {
        var enchantment = itemId.indexOf(Global.ENCH_ID);
        enchantment = enchantment < 0 ? itemId.indexOf(Global.ENCH_ID_SECOND) : enchantment;
        var pathPostfix = Global.FOLDER_ITEMS + (enchantment >= 0 ? 
            itemId.substring(0, enchantment) : itemId);
        var pathPrefix = document.URL;
        var fullPath = pathPrefix.substring(0, pathPrefix.lastIndexOf('/')) + pathPostfix;
        return parseFloat(loadFile(fullPath));
    };

    static processData(data) {
        var valuesById = {};
        for (let i = 0; i < data.length; i++) {
            var id = data[i][Global.ITEM_ID];
            if (!valuesById[id]) {
                valuesById[id] = [];
            }
            valuesById[id].push(data[i][Global.BUY_PRICE_MAX]);
        }

        var items = [];
        var keys = Object.keys(valuesById);
        var count = keys.length;
        for (let i = 0; i < count; i++)  {
            var itemId = keys[i];
            var max = Math.max(...valuesById[itemId]);
            var filtered_values = valuesById[itemId].filter(v => v > (max*0.5));
            var sum = filtered_values.reduce((a, b) => a + b, 0);
            var avg = (sum / filtered_values.length) || 0;
            items.push({
                itemId: itemId, 
                averageValue: avg, 
                stackValue: avg*999, 
                valueByWeight: avg / Model.getWeight(itemId)
            });
        }

        var normalizedValues = normalizeValues(items.map(i => i.stackValue));
        var normalizedValuesByWeight = normalizeValues(items.map(i => i.valueByWeight));
        for (let i = 0; i < count; i++) {
            items[i].coefficiency = ((normalizedValues[i] + normalizedValuesByWeight[i]) / 2)*100;
        }

        return items;
    }
}