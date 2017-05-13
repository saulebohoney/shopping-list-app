//appState
const appState = {
    currentID: 0,
    items:[]
};

//state mod functions
const addItem = function(state, item) {
    state.currentID++
    state.items.push({
      title: item,
      done: false,
      hidden: false,
      itemID: state.currentID,
  });
};
const itemToggle = function(state, domID) {
  let obj = state.items.find(item => item.itemID === domID);
  return (obj.done) ? (obj.done = false) : (obj.done = true);
};
const deleteItem = function(state, domID){
    let obj = state.items.find(item => item.itemID === domID);
    let i = state.items.indexOf(obj);
    return state.items.splice(i , 1);
};
const editItem = function(state, domID, nTitle) {
  let obj = state.items.find(item => item.itemID === domID);
  return obj.title = nTitle;
};
const showItem = function (state, domName) {
  let altObj = state.items.filter(item => item.title === domName);
  return altObj.map(item => item.hidden = false);
};
const hideItem = function(state, domID) {
  let obj = state.items.find(item => item.itemID === domID);
  return obj.hidden = true;
};
const showAll = function(state) {
  return state.items.map(item => item.hidden = false);
};
const hideAll = function(state) {
  return state.items.map(item => item.hidden = true);
}

//render functions
const renderList = function(state, element) {
  const itemsHTML = state.items.map(function(item) {
    return `<li class="todo-list-item" ${(item.hidden) ? 'hidden' : null}>
             <span class="shopping-item ${(item.done) ? 'shopping-item__checked' : null}">${item.title}</span>
             <div class="shopping-item-controls" id=${item.itemID}>
               <button class="shopping-item-toggle">
                <span class="button-label">check</span>
               </button>
               <button class="shopping-item-delete">
                <span class="button-label">delete</span>
               </button>
               <button class="hide-me-button" ${(item.done) ? null : 'hidden'}>
                <span class="button-label">hide</span>
               </button>
             </div>
             <div class="item-edit-panel" id=${item.itemID}>
             <form id="js-edit-form">
               <label for="shopping-list-edit"></label>
               <input type="text" name="shopping-list-edit" id="shopping-list-edit" placeholder="rename your entry">
               <button type="submit">Edit item</button>
             </form>
             </div>
            </li>`;
  });
  element.html(itemsHTML);
};

//event listeners(function)
$('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    addItem(appState, $('#shopping-list-entry').val());
    renderList(appState, $('.shopping-list'));
    $(this)[0].reset();
});
$('.shopping-list').on('click', 'button.shopping-item-toggle', function(event) {
    const idBtn = Number($(event.currentTarget).closest('div.shopping-item-controls').attr('id'));
    itemToggle(appState, idBtn);
    renderList(appState, $('.shopping-list'));
});
$('.shopping-list').on('click','button.shopping-item-delete', function(event) {
   const idBtn = Number($(event.currentTarget).closest('div.shopping-item-controls').attr('id'));
   deleteItem(appState, idBtn);
   renderList(appState, $('.shopping-list'));
});
$('.shopping-list').on('click','button.hide-me-button', function(event) {
   const idBtn = Number($(event.currentTarget).closest('div.shopping-item-controls').attr('id'));
   hideItem(appState, idBtn);
   renderList(appState, $('.shopping-list'));
});
$('.shopping-list').on('submit', '#js-edit-form', function(event) {
  event.preventDefault();
  const idBtn = Number($(event.currentTarget).closest('div.item-edit-panel').attr('id'));
  const editVal = $('#shopping-list-edit').closest('input').val();
  editItem(appState, idBtn, editVal);
  renderList(appState, $('.shopping-list'));
});
$('#js-search-form').submit(function(event) {
  event.preventDefault();
  let srchVal = $('#shopping-list-search').val();
  hideAll(appState);
  showItem(appState, srchVal);
  renderList(appState, $('.shopping-list'));
  $(this)[0].reset();
})
$('.show-all-button').click(function(event) {
  showAll(appState);
  renderList(appState, $('.shopping-list'));
});
