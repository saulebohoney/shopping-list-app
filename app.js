//appState
const appState = {
    currentIndex: 0,
    items:[]
};

// let test= function (item) {
//     return`<li>
//         <span class="shopping-item">${item}</span>
//         <div class="shopping-item-controls">
//           <button class="shopping-item-toggle">
//             <span class="button-label">check</span>
//           </button>
//           <button class="shopping-item-delete">
//             <span class="button-label">delete</span>
//           </button>
//         </div>
//       </li>`;
// };

//state mod functions
const addItem = function(state, item) {
    state.currentIndex++
    state.items.push({
      title: item,
      done: false,
      index: state.currentIndex,
  });
};
const itemDone = function(state, index) {
  //console.log(typeof index);
    let obj = state.items.find(item => item.index === index);
  //console.log(obj);
    return obj.done = true;
};

const deleteItem = function(state, index){
    let obj = state.items.find(item => item.index === index);
    let i= state.items.indexOf(obj);
    return state.items.splice(i,1);
};

//render functions
const renderList = function(state, element) {
    const itemsHTML = state.items.map(function(item) {
      return `<li>
             <span class="shopping-item ${(item.done) ? 'shopping-item__checked' : null }">${item.title}</span>
             <div class="shopping-item-controls" id=${item.index}>
               <button class="shopping-item-toggle">
                <span class="button-label">check</span>
               </button>
               <button class="shopping-item-delete">
                <span class="button-label">delete</span>
               </button>
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
    itemDone(appState, idBtn);
    renderList(appState, $('.shopping-list'));
});

$('.shopping-list').on('click','.shopping-item-delete', function(event) {
   const idBtn = Number($(event.currentTarget).closest('div.shopping-item-controls').attr('id'));
   deleteItem(appState, idBtn);
   renderList(appState, $('.shopping-list'));
});


// addItem(appState, ${input}.val());
