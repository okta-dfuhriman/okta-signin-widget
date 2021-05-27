/*!
 * Copyright (c) 2017, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { View, _ } from 'okta';
import hbs from 'handlebars-inline-precompile';
import 'qtip';
export default View.extend({
  className: 'scope-item',
  template: hbs(
    '\
      <div class="{{classNames}}">\
        <p>{{name}}</p>\
      </div>\
      {{#if description}}\
        <span class="scope-item-tooltip icon form-help-16"></span>\
      {{/if}}\
    '
  ),
  getTemplateData() {
    const { name, description, isCustomized } = this.options;
    const baseClass = 'scope-item-text';
    const classNames = (name === 'openid' || isCustomized)
      ? `${baseClass} no-translate`: baseClass;
    return { classNames, name, description };
  },

  postRender: function() {
    this.$('.scope-item-tooltip').qtip({
      content: {
        text: _.escape(this.options.description),
      },
      style: { classes: 'okta-tooltip qtip-custom qtip-shadow' },
      position: {
        my: 'bottom right',
        target: 'mouse',
      },
    });
  },
});
