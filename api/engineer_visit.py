import frappe


# electronica_customization.api.engineer_visit.get_primary_address
@frappe.whitelist()
def get_primary_address(customer):
    shipping_filters = [
        ["Dynamic Link", "link_doctype", "=", "Customer"],
        ["Dynamic Link", "link_name", "=", customer],
        ["address_type", "=", "Shipping"],
        ["is_shipping_address", "=", "1"],
    ]
    if not frappe.db.exists("Address", shipping_filters):
        del shipping_filters[-1]

    primary_shipping_address = frappe.get_value("Address", shipping_filters, "name")

    billing_filters = [
        ["Dynamic Link", "link_doctype", "=", "Customer"],
        ["Dynamic Link", "link_name", "=", customer],
        ["address_type", "=", "Billing"],
        ["is_primary_address", "=", "1"],
    ]

    if not frappe.db.exists("Address", billing_filters):
        del billing_filters[-1]

    primary_billing_address = frappe.get_value("Address", billing_filters, "name")

    return {
        "primary_shipping_address": primary_shipping_address,
        "primary_billing_address": primary_billing_address,
    }
