function showElement() {
    // get the selected
    const selected = $('input[name="options"]:checked');

    // check if a radio button is selected
    if (selected.length) {
        var selectedID = selected.attr('id');
        var products = $('#products');
        var stores = $('#stores');
        var orders = $('#orders');

        switch (selectedID) {
            case "Products":
                products.show();
                stores.hide();
                orders.hide();
                break;
            
            case "Stores":
                products.hide();
                stores.show();
                orders.hide();
                break;
            
            case "Orders":
                products.hide();
                stores.hide();
                orders.show();
                break;
        }
    } else {
        console.log('nothing is selected');
    }
}

function deleteItem(item, type) {

    item = JSON.parse(item);

    if (type == "products") {

        if (confirm("Are you sure you want to delete  " + item.cardName + "?")) {
            $.ajax({
                url: `/admin/${type}/${item.cardId}`,
                method: 'DELETE',
                success: function(data) {
                    if (data.status == 200) {
                        window.alert("successfully deleted " + item.cardName);
                    } else {
                        window.alert("could not delete " + item.cardName + ": " + data.message);
                    }
                    location.reload();
                },
                error: function(xhr, status, error) {
                    window.alert("Error deleting item: " + error);
                }
            });
        }

    } else if (type == "stores") {

        if (confirm("Are you sure you want to delete  " + item.storeName + "?")) {
            $.ajax({
                url: `/admin/${type}/${item.storeId}`,
                method: 'DELETE',
                success: function(data) {
                    if (data.status == 200) {
                        window.alert("successfully deleted " + item.storeName);
                    } else {
                        window.alert("could not delete " + item.storeName + ": " + data.message);
                    }
                    location.reload();
                },
                error: function(xhr, status, error) {
                    window.alert("Error deleting item: " + error);
                }
            });
        }

    }

}

function showProductsPopUp(data) {

    const popup = $('#productsPopupSection');
    const type = data.type;
    const action = data.action;

    switch (type) {

        case "products":

            const endpoint = "/admin/popup/products?action=";

            if (action == 'Create') {

                $.ajax({
                    url: `${endpoint}Create`,
                    method: 'GET',
                    success: function(html) {
                        popup.html(html);
                    },
                    error: function(xhr, status, error) {
                        console.log('Error loading popup:', error);
                    }
                });

            } else {

                const cardName = data.cardName;

                $.ajax({
                    url: `${endpoint}Edit&cardName=${cardName}`,
                    method: 'GET',
                    success: function(html) {
                        popup.html(html);
                    },
                    error: function(xhr, status, error) {
                        console.log('Error loading popup:', error);
                    }
                });

            }

    }

}

function clouseProductsPopup(event) {
    if ($(event.target).hasClass('modal-overlay') || $(event.target).hasClass('close-icon')) {
        $('#productsPopupSection').html("");
    }
}

function createItem(type) { 
    event.preventDefault();
    switch (type) {
        case "products":

            const cardName = $('#cardName').val();
            const price = $('#price').val();
            const labels = $('#labels').val();
            const image_location = $('#image_location').val();
            const twitter_post = $('#twitter_post').val();

            if (confirm("Are you sure you want to create  " + cardName + "?")) {
                $.ajax({
                    url: `/admin`,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        type,
                        cardName,
                        price,
                        labels,
                        image_location,
                        twitter_post
                    }),
                    success: function(data) {
                        window.alert(data.message);
                        location.reload();
                    },
                    error: function(xhr, status, error) {
                        window.alert("Error creating item: " + error);
                    }
                });
            }
    }
}

function editItem(type, args = null) {

    event.preventDefault();

    if (type == "products") {

        const cardName = $('#cardName').val();
        const cardId = $('#cardId').val();
        const price = $('#price').val();
        const image_location = $('#image_location').val();

        if (confirm("Are you sure you want to edit  " + cardName + "?")) {
            $.ajax({
                url: `/admin/${type}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: cardId,
                    data: {
                        price,
                        image_location
                    }
                }),
                success: function(data) {
                    window.alert(data.message);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    window.alert("Error editting item: " + error);
                }
            });
        }

    } else if (type == "stores") {

        const storeId = args.storeId;
        const storeName = $(`#storeName${storeId}`).val();
        const storeAddress = $(`#storeAddress${storeId}`).val();
        const phoneNumber = $(`#phoneNumber${storeId}`).val();
        const workingHours = $(`#workingHours${storeId}`).val();
        const imageLocation = $(`#imageLocation${storeId}`).val();

        const data = {
            id: storeId,
            storeName,
            storeAddress,
            phoneNumber,
            workingHours,
            imageLocation
        };

        if (confirm("Are you sure you want to edit  " + storeName + "?")) {
            $.ajax({
                url: `/admin/${type}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) {
                    window.alert(data.message);
                },
                error: function(xhr, status, error) {
                    window.alert("Error editting item: " + error);
                }
            });
        }

    }
}
