import { override } from '@microsoft/decorators';
import { Log, RandomNumberGenerator } from '@microsoft/sp-core-library';
import styles from './Styles/BannerExtensionApplicationCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import Banner from "./Banner";
import {IBannerExtensionApplicationCustomizerProperties} from './ApplicationCustomizerProperties';

import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
  SPHttpClientConfiguration
} from "@microsoft/sp-http";

import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
  ApplicationCustomizerContext
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'BannerExtensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'BannerExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
// export interface IBannerExtensionApplicationCustomizerProperties {
//   // This is an example; replace with your own property
//   testMessage: string;
//   TopMessage: string;
//   BottomMessage: string;
//   BannerSiteUrl: string;
// }


/** A Custom Action which can be run during execution of a Client Side Application */
export default class BannerExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IBannerExtensionApplicationCustomizerProperties> {

  private topPlaceholder : PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

    // Call render method for generating the HTML elements.
    this.renderPlaceHolders();


    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }

  private renderPlaceHolders(): void {
    //Get hold of the top placeholder
    if (!this.topPlaceholder) {
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this.onDispose }
          );

      //Checking if we have gotten hold of the top placeholder
      if (!this.topPlaceholder) {
        return;
      }

      if (this.properties) {
        let banner: Banner = new Banner();

        let bannerData =   banner.getBannerData(this.context, this.properties)
        .then((responseJSON) => {
            if (responseJSON!=null){
              let topString: string = responseJSON.BannerMessage.toString();

              // bannerData;//this.properties.TopMessage; //Extracting the value of the top placeholder string from properties
              if (!topString) {
                topString = '(Top property was not defined.)';
              }

              if (this.topPlaceholder.domElement) {
               //Since we have top placeholder, we will asign its html & styles to our liking
                this.topPlaceholder.domElement.innerHTML =  `
                  <div class="${styles.app}">
                    <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
                      <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
                    </div>
                  </div>`;
                }
              }
          });



        }
      }
    }



}
