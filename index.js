// Mock data, this should be backend
const providers = [
  {
    id: 'ABC01',
    name: 'Item One',
  },
  {
    id: 'ABC02',
    name: 'Item Two',
  },
  {
    id: 'ABC03',
    name: 'Item Three',
  },
  {
    id: 'ABC04',
    name: 'Item Four',
  },
];

function loadWfpkPlugin({
  targetEl = '#app',
  name = 'Default',
  colors = {
    primary: '#000000',
    secondary: '#000000',
    tertiary: '#000000',
  },
  data = {
    providers: providers,
  },
  enableCloseOutsideElement = true,
}) {
  // Target element #id to load this component to ----------------
  const component = document.querySelector(targetEl);

  // Declare all the styles here ---------------------------------
  const styles = `
   ${targetEl} {
     font-family: "Tahoma", Verdana;
     font-size: 1rem;
     padding: 1rem;
     min-width: 200px;
     max-width: 400px;
     margin: 0 auto;
     text-align: center;
   }
   ${targetEl} .active {
     font-weight: bold;
     color: ${colors.primary};
   }
   ${targetEl} h2 {
     color: ${colors.primary};
   }
   ${targetEl} h3 {
      color: ${colors.secondary};
   }
   ${targetEl} .wfpk-providers {
      position: relative;
   }
   ${targetEl} .wfpk-payment-providers {
      list-style: none;
      padding: 0;
      background: #f4f4f4;
      margin: 0 auto;
      border-radius: 0.5rem;
      width: 100%;
      position: absolute;
      top: 0;
      outline: 1px solid #cccccc;
      z-index: 100000001;
   }
   ${targetEl} .wfpk-payment-providers li {
      padding: 0.5rem;
      width: 100%;
    }
   ${targetEl} .wfpk-payment-providers li:hover {
      cursor: pointer;
      border-radius: 0.5rem;
      color: ${colors.primary};
    }
    ${targetEl} .wfpk-providers-list {
      position: relative;
      width: 200px;
    }
    ${targetEl} .wfpk-providers-list li {
      padding: 0.5rem;
    }
    ${targetEl} .wfpk-providers-default {
      padding: 0.5rem;
      outline: 1px solid #cccccc;
      border-radius: 0.5rem;
      cursor: pointer;
    }
    ${targetEl} .wfpk-selected {
      outline: 2px solid ${colors.primary};
      font-weight: bold;
      color: ${colors.primary};
    }
    ${targetEl} .wfpk-overlay {
      position: fixed;
      height: 100vh;
      width: 100vh;
      z-index: 100000000;
      top: 0;
      left: 0;
      opacity: 0.99;
    }
    ${targetEl} .wfpk-overlay {
      position: fixed;
      height: 100vh;
      width: 100vh;
      z-index: 100000000;
      top: 0;
      left: 0;
      opacity: 0.99;
    }
  `;

  // Append <style>, last one to render --------------------
  setTimeout(function () {
    const innerStyle = createEl('style');
    innerStyle.innerHTML = styles;
    component.appendChild(innerStyle);
  }, 1);

  // Reusable function to create el -----------------------
  const createEl = (tag) => {
    return document.createElement(tag);
  };

  // Base template -----------------------------------------
  component.innerHTML = `
    <h2>Hello ${name}</h2>
    <h3>How are are you today?</h3>
    <form>
      <div class="wfpk-providers">
       <div class="wfpk-providers-default">Please select one...</div>
      </div>
    </form>
  `;

  // Set selected item to the trigger element --------------
  function setSelectedListItem(item = null) {
    document.querySelector(
      '.wfpk-providers-default'
    ).textContent = `${item} is selected`;
    document
      .querySelector('.wfpk-providers-default')
      .classList.add('wfpk-selected');
  }

  // Append payment providers dropdown ----------------------
  const paymentProvidersList = createEl('ul');
  paymentProvidersList.className = 'wfpk-payment-providers';
  paymentProvidersList.innerHTML = data.providers
    .map((item) => {
      return `<li role="option" id="${item.id}">${item.name}</li>`;
    })
    .join('');

  // Remove the dropdown ----------------------------------
  function removeProviders() {
    const elements = document.querySelectorAll(
      `.wfpk-payment-providers ${
        enableCloseOutsideElement ? ', .wfpk-overlay' : ''
      }`
    );
    elements.forEach((item) => item.remove());
  }

  // Open the dropdown --------------------------------------
  function openProviders() {
    document.querySelector('.wfpk-providers').appendChild(paymentProvidersList);

    data.providers.map((item) => {
      document
        .querySelector(`#${item.id}`)
        .addEventListener('click', function () {
          const li = document.querySelectorAll('.wfpk-payment-providers>li');
          li.forEach((item) => {
            item.classList.remove('active');
          });
          this.className = 'active';
          setSelectedListItem(item.name);
          removeProviders();
        });
    });

    // Create an overlay el to enable user to click outside the dropdown
    if (enableCloseOutsideElement) {
      const overlay = createEl('div');
      overlay.className = 'wfpk-overlay';
      component.appendChild(overlay);
      document
        .querySelector('.wfpk-overlay')
        .addEventListener('click', removeProviders);
    }
  }

  // Event listener to open the drowdown --------------------
  document
    .querySelector('.wfpk-providers-default')
    .addEventListener('click', openProviders);

  return component;
}

// =========================================
loadWfpkPlugin({
  targetEl: '#WfpkApp',
  name: 'Tom',
  colors: {
    primary: '#cc0000',
    secondary: '#666666',
  },
});
