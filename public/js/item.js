frappe.ui.form.on("Item", {
    setup: (frm) => {
        frm.fields_dict.custom_series.get_query = function (doc) {
            return {
                filters: [
                    ['main_selection', '=', frm.doc?.custom_product_family || ""]
                ]
            };
        };

        frm.fields_dict.custom_model.get_query = function (doc) {
            return {
                filters: [
                    ['main_selection', '=', frm.doc?.custom_product_family || ""],
                    ['series', '=', frm.doc?.custom_series || ""]
                ]
            };
        };
    },
    custom_product_family: (frm) => {
        handleProductFamilyUpdate(frm);
    },
    custom_series: (frm) => {
        handleSeriesUpdate(frm);
    },
    custom_list_price: (frm) => {
        const custom_list_price = frm.doc.custom_list_price ?? 0;

        // Unit Price is 15% more than List Price
        frm.set_value("custom_unit_price", custom_list_price.toFixed(2) * 1.15);
    }
});


function handleProductFamilyUpdate(frm) {
    frm.fields_dict.custom_series.get_query = function (doc) {
        return {
            filters: [
                ['main_selection', '=', frm.doc.custom_product_family]
            ]
        };
    };

    frm.set_value("custom_series", "");
    frm.set_value("custom_model", "");

    frm.refresh_field("custom_series");
    frm.refresh_field("custom_model");
}

function handleSeriesUpdate(frm) {
    frm.fields_dict.custom_model.get_query = function (doc) {
        return {
            filters: [
                ['main_selection', '=', frm.doc.custom_product_family],
                ['series', '=', frm.doc.custom_series]
            ]
        };
    };

    frm.set_value("custom_model", "");

    frm.refresh_field("custom_model");
}
