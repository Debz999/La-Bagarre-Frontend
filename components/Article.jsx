import React from 'react';

const Article = require('../models/articles');

function ArticlePage() {




    return (
      <div>
        <h4>The New-Yorker</h4>
        <p>Description</p>
        <Button placeHolder="add to Cart"></Button>
      </div>
    );
   }
   
   export default ArticlePage;