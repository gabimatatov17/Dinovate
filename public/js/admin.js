function showElement() {
    // get the selected
    const selected = $('input[name="options"]:checked');

    // check if a radio button is selected
    if (selected.length) {
        var selectedID = selected.attr('id');
        var products = $('#products');
        var stores = $('#stores');
        var orders = $('#orders');
        var users = $('#users');
        var overview = $('#overview');

        switch (selectedID) {
            case "Products":
                products.show();
                stores.hide();
                orders.hide();
                users.hide();
                overview.hide();
                break;
            
            case "Stores":
                products.hide();
                stores.show();
                orders.hide();
                users.hide();
                overview.hide();
                break;
            
            case "Orders":
                products.hide();
                stores.hide();
                orders.show();
                users.hide();
                overview.hide();
                break;
            
            case "Users":
                products.hide();
                stores.hide();
                orders.hide();
                users.show();
                overview.hide();
                break;
            
            case "Overview":
                products.hide();
                stores.hide();
                orders.hide();
                users.hide();
                overview.show();
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

    } else if (type == "orders") {

        if (confirm("Are you sure you want to delete  " + item.orderId + "?")) {
            $.ajax({
                url: `/admin/${type}/${item.orderId}`,
                method: 'DELETE',
                success: function(data) {
                    if (data.status == 200) {
                        window.alert("successfully deleted " + item.orderId);
                    } else {
                        window.alert("could not delete " + item.orderId + ": " + data.message);
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

function showPopUp(data) {

    const popup = $('#popupSection');
    const type = data.type;
    let endpoint = null;

    if (type == "products") {

        const action = data.action;
        endpoint = "/admin/popup/products?action=";

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
    else if (type == "stores") {

        endpoint = "/admin/popup/stores";
        $.ajax({
            url: `${endpoint}`,
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

function closePopup(event) {
    if ($(event.target).hasClass('modal-overlay') || $(event.target).hasClass('close-icon')) {
        $('#popupSection').html("");
    }
}

function createItem(type) { 
    event.preventDefault();

    if (type == "products") {

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
    else if (type == "stores") {

        const storeName = $('#storeName').val();
        const storeAddress = $('#storeAddress').val();
        const phoneNumber = $('#phoneNumber').val();
        const workingHours = $('#workingHours').val();
        const imageLocation = $('#imageLocation').val();
        const twitter_post = $('#twitter_post').val();

        if (confirm("Are you sure you want to create  " + storeName + "?")) {
            $.ajax({
                url: `/admin`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    type,
                    storeName,
                    storeAdress: storeAddress,
                    phoneNumber,
                    workingHours,
                    imageLocation,
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

    } else if (type == "orders") {

        const orderId = args.orderId;
        const customerId = $(`#customerId${orderId}`).val();
        const totalPrice = $(`#totalPrice${orderId}`).val();
        const shippingAdress = $(`#shippingAdress${orderId}`).val();

        const data = {
            id: orderId,
            customerId,
            totalPrice,
            shippingAdress
        };

        if (confirm("Are you sure you want to edit " + orderId + "?")) {
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

function getUsers() {

    const container = $('#usertable');
    let customerType = $('#userFilter').val();
    let isAdmin = customerType == "admin" ? true : false;

    $.ajax({
        url: `/admin/users/${isAdmin}`,
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {

            let htmlObject = `
                <div style="display: flex; justify-content: center;">
                    <table class="table table-hover table-striped table-bordered" id="dataTable" style="width: 60%; max-width: 800px;">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody id="dataBody">
            `
            const users = data.message;

            for (user of users) {
                
                htmlObject += `
                                <tr>
                                    <th scope="row">${user.email}</th>
                                    <td>${user._id}</td>
                                    <td>${user.amountOfOrders}</td>
                                </tr>
                            `

            }

            htmlObject += `
                        </tbody>
                    </table>
                </div>
            `
            container.html(htmlObject);
        },
        error: function(xhr, status, error) {
            window.alert("Error querying users: " + error);
        }
    });

}

getUsers();