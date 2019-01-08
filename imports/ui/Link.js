import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';


export default () => {
  return (
    <div>
             <PrivateHeader title="Your links"/>
             <LinksList/>
             <AddLink/>
    </div> );
}
