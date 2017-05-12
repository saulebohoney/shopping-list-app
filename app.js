//appState
const appState = {
    items:[
      {title: 'apples', done: false}
    ]
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
  state.items.push({
    title: item,
    done: false
  });
};
const itemDone = function(state, itemName) {
  state.items.find(function(item) {
    return item.title === itemName;
  })
};

//render functions
const renderList = function(state, element) {
  const itemsHTML = state.items.map(function(item) {
    return `<li>
             <span class="shopping-item">${item.title}</span>
             <div class="shopping-item-controls">
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
// function if done: true, then strikethrough item.title


//event listeners(function)
$('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    addItem(appState, $('#shopping-list-entry').val());
    renderList(appState, $('.shopping-list'));
    $(this)[0].reset();
});
$('.shopping-list').on('click', 'button.shopping-item-toggle', function(event) {
  // call mod function that makes done: true
  // call render function to addclass .shopping-item__checked to span
});



// addItem(appState, ${input}.val());
