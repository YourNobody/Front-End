// enum SelectorType {
//   CLASSNAME = 'CLASSNAME', ID = 'ID', DATA_ATTRIBUTE = 'DATA_ATTRIBUTE', TAG = 'TAG'
// }

// function goUp(el: HTMLElement): HTMLElement {
//   if (el && el.parentElement) {
//     return el.parentElement;
//   }
//   return null;
// }

// function checkForHTMLElement(el: HTMLElement, selector: SelectorType): boolean {
//   const type = defineSelectorValidate(selector);
//   if (!type) return false;
//   if (type === SelectorType.CLASSNAME && el.attributes.getNamedItem('class')) {
//     const cls = selector[0] === '.' ? selector.substring(1) : selector;
//     return el.attributes.getNamedItem('class').value.split(' ').includes(cls);
//   } else if (type === SelectorType.ID && el.attributes.getNamedItem('id')) {

//   }
// }

// export function findParent(el: HTMLElement, selector: string): HTMLElement {
//   const type = defineSelectorValidate(selector); 
//   if (!type) return null;
//   let parent = null;
  
// }

// export function defineSelectorValidate(selector: string): string {
//   const sel = selector.trim().toLocaleLowerCase();
//   if (!sel) return '';
//   if (sel.startsWith('.')) {
//     return SelectorType.CLASSNAME;
//   } else if (sel.startsWith('#')){
//     return SelectorType.ID;
//   } else if (sel.match(/\[.*(=[\"\'].*[\"|\'])?\]/) && sel.match(/\[.*(=[\"\'].*[\"|\'])?\]/)[0] === sel) {
//     return SelectorType.DATA_ATTRIBUTE;
//   } else if (sel.match(/[a-z]*[1-6]?$/) && sel.match(/[a-z]*[1-6]?$/)[0] === sel) {
//     return SelectorType.TAG;
//   } else if (sel.match(/\w*/)) {
//     return SelectorType.CLASSNAME;
//   }
//   return '';
// }