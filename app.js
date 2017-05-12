//appState
const appState={

    items:[]

};
let item= 'pineapples';
let test= function (item) {
    return`<li>
        <span class="shopping-item">${item}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
};
      
console.log(test);

//state mod functions

//render functions

//event listeners(function)

