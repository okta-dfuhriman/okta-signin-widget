import _Handlebars2 from '../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { loc, View } from '../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/handle-url.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-base64.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-i18n.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-img.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-markdown.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-xsrfTokenInput.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import oktaJQueryStatic from '../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import oktaUnderscore from '../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import Enums from '../../util/Enums.js';
import FormController from '../util/FormController.js';
import FormType from '../util/FormType.js';
import EnduserScopeList from '../views/consent/ScopeList.js';
import SkipLink from '../views/shared/SkipLink.js';
import consentLogoHeaderTemplate from '../views/shared/templates/consentLogoHeaderTemplate.js';

var ConsentRequiredController = FormController.extend({
  className: 'consent-required',
  initialize: function () {
    this.model.set('expiresAt', this.options.appState.get('expiresAt'));
    this.model.set('scopes', this.options.appState.get('scopes'));
    this.listenTo(this.form, 'cancel', oktaUnderscore.bind(this.model.cancel, this.model)); // add Skip to main content link

    const skipLink = new SkipLink();
    oktaJQueryStatic(`#${Enums.WIDGET_LOGIN_CONTAINER_ID}`).prepend(skipLink.render().$el);
  },
  postRender: function () {
    FormController.prototype.postRender.apply(this, arguments); // Update the "don't allow" and "allow access" buttons to be neutral by changing "allow button" to be gray.

    this.$('.o-form-button-bar .button-primary').removeClass('button-primary');
  },
  Model: {
    props: {
      expiresAt: ['string', true],
      scopes: ['array', true]
    },
    save: function () {
      return this.doTransaction(function (transaction) {
        return transaction.consent({
          consent: {
            expiresAt: this.get('expiresAt'),
            scopes: oktaUnderscore.pluck(this.get('scopes'), 'name')
          }
        });
      });
    },
    cancel: function () {
      const self = this;
      return this.doTransaction(function (transaction) {
        return transaction.cancel();
      }).then(function () {
        const consentCancelFn = self.settings.get('consent.cancel');

        if (oktaUnderscore.isFunction(consentCancelFn)) {
          consentCancelFn();
        }
      });
    }
  },
  Form: {
    noCancelButton: false,
    buttonOrder: ['cancel', 'save'],
    autoSave: true,
    save: oktaUnderscore.partial(loc, 'consent.required.consentButton', 'login'),
    cancel: oktaUnderscore.partial(loc, 'consent.required.cancelButton', 'login'),
    formChildren: function () {
      return [FormType.View({
        View: View.extend({
          className: 'consent-title detail-row',
          template: consentLogoHeaderTemplate,
          getTemplateData: function () {
            const appState = this.options.appState;
            return {
              appName: appState.escape('targetLabel'),
              customLogo: appState.get('targetLogo') && appState.get('targetLogo').href,
              defaultLogo: appState.get('defaultAppLogo'),
              clientURI: appState.get('targetClientURI') && appState.get('targetClientURI').href
            };
          }
        })
      }), FormType.View({
        View: new EnduserScopeList({
          model: this.model
        })
      }), FormType.View({
        View: View.extend({
          className: 'consent-description detail-row',
          template: _Handlebars2.template({
            "compiler": [8, ">= 4.3.0"],
            "main": function (container, depth0, helpers, partials, data) {
              var lookupProperty = container.lookupProperty || function (parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                  return parent[propertyName];
                }

                return undefined;
              };

              return "<p>" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
                "name": "i18n",
                "hash": {
                  "bundle": "login",
                  "code": "consent.required.description"
                },
                "data": data,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 3
                  },
                  "end": {
                    "line": 1,
                    "column": 62
                  }
                }
              })) + "</p>";
            },
            "useData": true
          })
        })
      })];
    }
  },
  Footer: View.extend({
    className: 'consent-footer',
    template: _Handlebars2.template({
      "1": function (container, depth0, helpers, partials, data) {
        var stack1,
            helper,
            alias1 = depth0 != null ? depth0 : container.nullContext || {},
            alias2 = container.hooks.helperMissing,
            alias3 = container.escapeExpression,
            lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }

          return undefined;
        };

        return "<a class=\"terms-of-service\" href=\"" + alias3((helper = (helper = lookupProperty(helpers, "termsOfService") || (depth0 != null ? lookupProperty(depth0, "termsOfService") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
          "name": "termsOfService",
          "hash": {},
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 56
            },
            "end": {
              "line": 1,
              "column": 74
            }
          }
        }) : helper)) + "\" target=\"_blank\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
          "name": "i18n",
          "hash": {
            "bundle": "login",
            "code": "consent.required.termsOfService"
          },
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 92
            },
            "end": {
              "line": 1,
              "column": 154
            }
          }
        })) + "</a>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "privacyPolicy") : depth0, {
          "name": "if",
          "hash": {},
          "fn": container.program(2, data, 0),
          "inverse": container.noop,
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 158
            },
            "end": {
              "line": 1,
              "column": 194
            }
          }
        })) != null ? stack1 : "");
      },
      "2": function (container, depth0, helpers, partials, data) {
        return " &#8226 ";
      },
      "4": function (container, depth0, helpers, partials, data) {
        var helper,
            alias1 = depth0 != null ? depth0 : container.nullContext || {},
            alias2 = container.hooks.helperMissing,
            alias3 = container.escapeExpression,
            lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }

          return undefined;
        };

        return "<a class=\"privacy-policy\" href=\"" + alias3((helper = (helper = lookupProperty(helpers, "privacyPolicy") || (depth0 != null ? lookupProperty(depth0, "privacyPolicy") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
          "name": "privacyPolicy",
          "hash": {},
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 254
            },
            "end": {
              "line": 1,
              "column": 271
            }
          }
        }) : helper)) + "\" target=\"_blank\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
          "name": "i18n",
          "hash": {
            "bundle": "login",
            "code": "consent.required.privacyPolicy"
          },
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 289
            },
            "end": {
              "line": 1,
              "column": 350
            }
          }
        })) + "</a>";
      },
      "compiler": [8, ">= 4.3.0"],
      "main": function (container, depth0, helpers, partials, data) {
        var stack1,
            alias1 = depth0 != null ? depth0 : container.nullContext || {},
            lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }

          return undefined;
        };

        return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "termsOfService") : depth0, {
          "name": "if",
          "hash": {},
          "fn": container.program(1, data, 0),
          "inverse": container.noop,
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 201
            }
          }
        })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "privacyPolicy") : depth0, {
          "name": "if",
          "hash": {},
          "fn": container.program(4, data, 0),
          "inverse": container.noop,
          "data": data,
          "loc": {
            "start": {
              "line": 1,
              "column": 201
            },
            "end": {
              "line": 1,
              "column": 361
            }
          }
        })) != null ? stack1 : "");
      },
      "useData": true
    }),
    getTemplateData: function () {
      const appState = this.options.appState;
      return {
        termsOfService: appState.get('targetTermsOfService') && appState.get('targetTermsOfService').href,
        privacyPolicy: appState.get('targetPrivacyPolicy') && appState.get('targetPrivacyPolicy').href
      };
    }
  })
});

export { ConsentRequiredController as default };
//# sourceMappingURL=ConsentRequiredController.js.map
