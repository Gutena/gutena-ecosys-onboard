/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/GutenaKitInstallCTAPanel.js":
/*!****************************************************!*\
  !*** ./src/components/GutenaKitInstallCTAPanel.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helper */ "./src/helper.js");







const gutenaIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
  icon: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    color: "#ffffff"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "2.75",
    y: "3.75",
    width: "18.5",
    height: "16.5",
    stroke: "#0EA489",
    strokeWidth: "1.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "6",
    y: "7",
    width: "12",
    height: "1",
    fill: "#0EA489"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "6",
    y: "11",
    width: "12",
    height: "1",
    fill: "#0EA489"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "6",
    y: "15",
    width: "12",
    height: "1",
    fill: "#0EA489"
  }))
});
const GutenaKitInstallCTAPanel = _ref => {
  let {
    name: blockName
  } = _ref;
  //ctaStatus = 0:not initiated, 1 : in progress, 2: Completed, 3:Error, 4: dismissed
  const [ctaStatus, setCtaStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);

  //variable to check if gutena kit already installed but not activated
  let gutenaKitAlreadyExists = false;

  //check if gutena kit already installed but not activated
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let getPluginInstalled = true;
    if (getPluginInstalled) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        method: 'GET',
        path: '/wp/v2/plugins'
      }).then(res => {
        if (!(0,_helper__WEBPACK_IMPORTED_MODULE_5__.gutenaEcosysOnboardIsEmpty)(res)) {
          for (let index = 0; index < res.length; index++) {
            if ("gutena-kit/gutena-kit" === res[index].plugin && "inactive" === res[index].status) {
              gutenaKitAlreadyExists = true;
            }
          }
        }
      });
    }
    return () => {
      getPluginInstalled = false;
    };
  }, []);

  //Activate Gutena Kit plugin
  const activateGutenaKit = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      method: 'PUT',
      path: '/wp/v2/plugins/gutena-kit/gutena-kit',
      data: {
        status: 'active'
      }
    }).then(res => {
      setCtaStatus(2);
    }).catch(error => {
      console.log("my res", error.message);
      setCtaStatus(2);
    });
  };

  //Install and activate gutena kit
  const installActivateGutenaBlocks = () => {
    //check if already in process 
    if (1 === ctaStatus) {
      return false;
    }

    //check if process completed and click to go to complete settings page
    if (2 === ctaStatus) {
      //open in new tab
      window.open(gutenaEcosysOnboardData.gk_dashboard_url, "_blank");
    }

    //Set status to in progress i.e. 1
    setCtaStatus(1);
    if (true === gutenaKitAlreadyExists) {
      //activate gutena kit if already exists
      activateGutenaKit();
    } else {
      //Install Gutena kit
      fetch(gutenaEcosysOnboardData.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        // <-- make sure to include credentials
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'X-WP-Nonce': gutenaEcosysOnboardData.nonce
        },
        body: new URLSearchParams({
          action: gutenaEcosysOnboardData.install_action,
          _ajax_nonce: gutenaEcosysOnboardData.nonce,
          slug: 'gutena-kit'
        })
      }).then(response => response.json()).then(data => {
        //activate gutena kit after successfully installtion or if already exists	
        if (true === data.success || false === data.success && 'folder_exists' === data.data.errorCode) {
          activateGutenaKit();
        }
      });
    }
  };

  //Dismiss CTA
  const dismissCta = () => {
    //Install Gutena kit
    fetch(gutenaEcosysOnboardData.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      // <-- make sure to include credentials
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-WP-Nonce': gutenaEcosysOnboardData.nonce
      },
      body: new URLSearchParams({
        action: gutenaEcosysOnboardData.dismiss_action,
        _ajax_nonce: gutenaEcosysOnboardData.nonce
      })
    }).then(response => response.json()).then(data => {
      setCtaStatus(4);
    });
  };

  //Get content details
  const getDetails = function () {
    let keyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'btnName';
    let btnName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install Gutena kit');
    let discription = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get access to blocks and pre-made templates.');
    switch (ctaStatus) {
      case 1:
        //In progress
        btnName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Installing...');
        break;
      case 2:
        //Success
        btnName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Complete setup');
        discription = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gutena Kit Installed Successfully.');
        break;
      case 3:
        //failed
        btnName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to install');
        break;
      default:
        break;
    }
    return 'btnName' === keyName ? btnName : discription;
  };
  return 4 !== ctaStatus && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutena-inspector-cta",
    style: {
      backgroundImage: 'url(' + gutenaEcosysOnboardData.icons.bg_img + ' )'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutena-cta-dismiss"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: gutenaEcosysOnboardData.icons.close_img,
    className: "gutena-cta-dismiss-icon",
    onClick: () => dismissCta()
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutena-cta-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutena-cta-logo"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: gutenaEcosysOnboardData.icons.logo_img,
    alt: "logo"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutena-cta-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "gutena-cta-discription"
  }, getDetails('discription')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: () => installActivateGutenaBlocks(),
    className: `gutena-cta-install-btn ${1 === ctaStatus ? "start-installing" : ""}`
  }, 2 !== ctaStatus && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: gutenaEcosysOnboardData.icons.install_img,
    alt: "install-icon",
    className: "gutena-cta-icon"
  }), getDetails('btnName'), 2 === ctaStatus && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: gutenaEcosysOnboardData.icons.right_arrow_dark,
    alt: "link-icon",
    className: "gutena-cta-icon"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "gutena-cta-web-link",
    href: gutenaEcosysOnboardData.gutena_weblink,
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visit Website'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: gutenaEcosysOnboardData.icons.right_arrow,
    alt: "link-icon",
    className: "gutena-cta-icon"
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (GutenaKitInstallCTAPanel);

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gutenaEcosysOnboardIsEmpty": function() { return /* binding */ gutenaEcosysOnboardIsEmpty; }
/* harmony export */ });
//Check if undefined, null, empty

const gutenaEcosysOnboardIsEmpty = data => {
  return 'undefined' === typeof data || null === data || '' == data;
};

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withGutenaKitInstallCTA": function() { return /* binding */ withGutenaKitInstallCTA; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
/* harmony import */ var _components_GutenaKitInstallCTAPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/GutenaKitInstallCTAPanel */ "./src/components/GutenaKitInstallCTAPanel.js");












/**
 * Override the default edit UI to include gutena CTA
 *
 * @param {Function} BlockEdit Original component.
 *
 * @return {Function} Wrapped component.
 */
const withGutenaKitInstallCTA = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => props => {
  const {
    name: blockName
  } = props;
  const requireInstallCTA = -1 !== gutenaEcosysOnboardData.gutena_plugins_blockname.indexOf(blockName);
  return [requireInstallCTA && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_GutenaKitInstallCTAPanel__WEBPACK_IMPORTED_MODULE_10__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: "gutenacta"
  }, props)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: "edit"
  }, props))];
}, 'withGutenaKitInstallCTA');
if (!(0,_helper__WEBPACK_IMPORTED_MODULE_9__.gutenaEcosysOnboardIsEmpty)(gutenaEcosysOnboardData) && '1' == gutenaEcosysOnboardData.gutena_kit_require) {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.BlockEdit', 'gutena/editor/with-gutenakit-install-cta', withGutenaKitInstallCTA);
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map