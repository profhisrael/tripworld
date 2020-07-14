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

// event on input
searchBar.forEach((el) =>
  el.addEventListener('input', (e) => {
    if (e.target.value.length < 1) {
      modalControl(modal).close();
    } else {
      setTimeout(() => {
        postData(e.target.value)
          .then((data) => {
            const v = data.webPages.value;
            console.log(v);
            if (v.length > 0) {
              modalControl(modal).open();
              const result = v
                .map((elm) => `<div class="sug_result">${elm.name}</div>`)
                .join('');
              modal.forEach((x) => {
                x.innerHTML = result;
              });
            }
          })
          .catch((e) => console.log(e));
      }, 100);
    }
  })
);

// api call

// control modal
function modalControl(el) {
  return {
    open: () => {
      console.log(Array.isArray(el));
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

async function postData(q) {
  if (q < 1) return;
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
}
