function getUrl(key) {
    const baseUrl = "http://localhost:8002/api/";
    let url = "";
    switch (key) {
        case "auth":
            url = baseUrl + "auth";
            break;
        case "users":
            url = baseUrl + "users";
            break;
        case "addCategory":
            url = baseUrl + "category/add";
            break;
        case "updateCategory":
            url = baseUrl + "category/update";
            break;
        case "deleteCategory":
            url = baseUrl + "category/delete";
            break;
        case "getCategory":
            url = baseUrl + "category/one";
            break;
        case "listCategory":
            url = baseUrl + "category/list";
            break;
            //Event
        case "addEnroll":
            url = baseUrl + "event_enroll/enroll";
            break;
        case "addEvent":
            url = baseUrl + "event/add";
            break;
        case "updateEvent":
            url = baseUrl + "event/update";
            break;
        case "deleteEvent":
            url = baseUrl + "event/delete";
            break;
        case "getEvent":
            url = baseUrl + "event/one";
            break;
        case "getEventParticipatients":
            url = baseUrl + "event/list/participatients";
            break;
        case "listEvent":
            url = baseUrl + "event/list";
            break;
        case "listActiveEvent":
            url = baseUrl + "event/list/active";
            break;
        case "addUsers":
            url = baseUrl + "users/add";
            break;
        case "updateUsers":
            url = baseUrl + "users/update";
            break;
        case "deleteUsers":
            url = baseUrl + "users/delete";
            break;
        case "getUsers":
            url = baseUrl + "users/one";
            break;
        case "listUsers":
            url = baseUrl + "users/list";
            break;

        case "newQuestion":
            url = baseUrl + "question/new";
            break;
        case "replyQuestion":
            url = baseUrl + "question/reply";
            break;
        case "listQuestion":
            url = baseUrl + "question/list";
            break;
        case "addProduct":
            url = baseUrl + "product/add";
            break;
        case "updateProduct":
            url = baseUrl + "product/update";
            break;
        case "updateProductWithImage":
            url = baseUrl + "product/updateWithImage";
            break;
        case "deleteProduct":
            url = baseUrl + "product/delete";
            break;
        case "getProduct":
            url = baseUrl + "product/one";
            break;
        case "listProduct":
            url = baseUrl + "product/list";
            break;
        case "ActiveListProduct":
            url = baseUrl + "product/active/list";
            break;
        case "addOrder":
            url = baseUrl + "order/add";
            break;
        case "orderList":
            url = baseUrl + "order/list";
            break;
        default:
            break;
    }
    return url;
}

module.exports = getUrl;