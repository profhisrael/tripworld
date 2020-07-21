{
  /* <script
  type="text/javascript"
  id="bcs_js_snippet"
  src="https://ui.customsearch.ai/api/ux/rendering-js?customConfig=ae7157cd-7677-47cf-a83b-37e388fe6257&market=en-US&version=latest&q="
></script>; */
}
var info = {
  url:
    'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?' +
    'q=hey&customconfig=ae7157cd-7677-47cf-a83b-37e388fe6257',
  headers: {
    'Ocp-Apim-Subscription-Key': 'c88513fa3e0e4c4190e34074e247d33c',
  },
};
const searchBar = [
  ...[...document.querySelectorAll('.searchresponse')],
  ...[...document.querySelectorAll('.search1')],
];
const modal = [...document.querySelectorAll('.suggestions')];
const forms = [...document.querySelectorAll('form')];
forms.forEach((form) => form.addEventListener('submit', (e) => search(e)));

// event on input
searchBar.forEach((el) =>
  el.addEventListener('input', (e) => {
    if (e.target.value.length < 1) {
      modalControl(modal).close();
    } else {
      setTimeout(() => {
        postData(e.target.value)
          .then((data) => {
            const v = data.webPages.value ? data.webPages.value : [];
            if (v.length > 0) {
              modalControl(modal).open();
              const result = v
                .map(
                  (elm) =>
                    `<a href="https://www.bing.com/search?q=${elm.name}"  class="sug_result">${elm.name}</a>`
                )
                .join('');
              modal.forEach((x) => {
                x.innerHTML = result;
              });
            }
          })
          .catch((e) => console.log(e));
      }, 2000);
    }
  })
);

// control modal
function modalControl(el) {
  return {
    open: () => {
      el.forEach((elem) => {
        if (elem.classList.contains('display_none')) {
          elem.classList.remove('display_none');
        }
      });
    },
    close: () => {
      el.forEach((elem) => {
        if (!elem.classList.contains('display_none')) {
          elem.classList.add('display_none');
        }
      });
    },
  };
}
// api call

async function postData(q) {
  if (q < 1) return;
  try {
    const response = await fetch(
      `https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?q=${q}&customconfig=ae7157cd-7677-47cf-a83b-37e388fe6257`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'c88513fa3e0e4c4190e34074e247d33c',
        },
      }
    );
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(e);
  }
}
function search(e) {
  e.preventDefault();
  const { query } = getFormData(e.target);
  window.location = `https://www.bing.com/search?q=${query}`;
}

function getFormData(form) {
  let reqBody = {};
  Object.keys(form.elements).forEach((key) => {
    let element = form.elements[key];
    if (element.type !== 'submit') {
      reqBody[element.name] = element.value;
    }
  });
  return reqBody;
}
