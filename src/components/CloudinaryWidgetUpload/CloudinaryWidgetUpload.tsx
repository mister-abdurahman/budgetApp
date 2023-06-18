import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

function CloudinaryWidgetUpload() {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dsdxher6x'
        }
      });
    
      // cld.image returns a CloudinaryImage with the configuration set.
      const myImage = cld.image('sample');
    
      // The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample
    
      // Render the image in a React component.
      return (
        <div>
          <AdvancedImage cldImg={myImage} />
        </div>
      )
}

export default CloudinaryWidgetUpload