/************************
********MrSasaN**********
********Was Here*********
************************/
import CONFIG from '../Functions/Config.js';

var base = {
  gotopage: function (navigator, id, transition = 'null', routepage = 'null') {
    navigator.push({id: id, type: transition, routepage: routepage});
  },
  DeleteCatalog: function (CatalogId) {
    const CatelogData = new FormData();
    CatelogData.append('CatalogId', CatalogId);

    fetch( CONFIG.SERVER_URL + "DeleteCatalogs.php", {
      method: 'post',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.result == "OK"){
        return true;
      }else{
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  DeleteProduct: function (ProductId) {
    const CatelogData = new FormData();
    CatelogData.append('ProductId', ProductId);

    fetch( CONFIG.SERVER_URL + "DeleteProduct.php", {
      method: 'post',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.result == "OK"){
        return true;
      }else{
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  Numbers_engTofa: function (str){
    var mapObj = {'0':'۰', '1':'۱', '2':'۲', '3':'۳', '4':'۴', '5':'۵', '6':'۶', '7':'۷', '8':'۸', '9':'۹'};
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
  },
}

module.exports = base;
