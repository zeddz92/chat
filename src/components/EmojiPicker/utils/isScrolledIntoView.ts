export const isScrolledIntoView = (elem: HTMLElement) => {
  var docViewTop = window.scrollY;
  var docViewBottom = docViewTop + window.innerHeight;

  var elemTop = elem.offsetTop;
  var elemBottom = elemTop + elem.offsetHeight;

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
};
