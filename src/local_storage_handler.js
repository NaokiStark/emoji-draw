export const get_works = function () {

    let store = localStorage.getItem('works');
    if (store == null || store == "") {
        return [];
    }
    return JSON.parse(store);
}

export const save_work = function (item) {
    let works = get_works();
    item.saved_at = (new Date()).toLocaleDateString();

    works.push(item);

    localStorage.setItem('works', JSON.stringify(works));
}

export const delete_work = function (id) {
    let works = get_works();
    works.splice(id, 1);

    localStorage.setItem('works', JSON.stringify(works));
}
