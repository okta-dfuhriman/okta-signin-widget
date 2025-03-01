/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */

import deleteUser from './deleteUser';
import ActionContext from '../../support/context';

// eslint-disable-next-line no-unused-vars
export default async function(this: ActionContext): Promise<void> {
    if (process.env.LOCAL_MONOLITH) {
        // keep users on local monolith to aid with local debugging
        return;
    }

    // remove users in live production org
    if (this.credentials) {
        await this.a18nClient!.deleteProfile(this.credentials.profileId!);
    }
    if (this.user) {
        await deleteUser(this.user);
    }
  }
