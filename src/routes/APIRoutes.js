//AUTH ROUTES
export const LOGIN = '/login';
export const HOME = '/Home';

//PROVIDERS ROUTES
export const GETALLPROVIDERS = '/provider/getAllProviders';
export const CREATEPROVIDER = '/provider/createProvider';
export const SETPRODUCTTOPROVIDER = '/provider/addProductProvider';

//PROVIDER CONTACT ROUTES
export const CREATEPROVCONTACT = '/providerContact/createContact';

//REQUEST ROUTES
export const CREATEREQUEST = '/request/createRequest';
export const GETALLREQUEST = '/request/getAllRequests';
export const GETALLREQUESTDATA = '/request/getAllRequestsData'
export const GETSPECIFICREQUESTDATA = '/request/getSpecificRequest';
export const UPDATEREQUESTSTATUS = '/request/updateRequest';
export const GETOWNREQUESTDATA = '/request/getOwnRequests';
export const GETDEPTOREQUEST = '/request/getDeptoRequests';
export const GETSUBDEPTOREQUEST = '/request/getSubdeptoRequests';

//COSTECENTER ROUTES
export const GETCOSTCENTER = '/costCenter/allCostCenters';
export const GETDEPTONOCRITIC = '/costCenter/allCostCenterExpectCritics';

//SUBDEPTO ROUTES
export const GETALLSUBDEPTOOFDEPTO = '/subDepto/getAllSubdetoOfDepto';
export const CREATESUBDEPTO = '/subDepto/createSubDepto';

//SUBDEPTOPFUNCTIONS ROUTES
export const GETALLSUBDEPTOFUNCTIONBYSUBDEPTO = '/subDeptoFunction/getAllFunctionsOfSubDepto';

//ACTION ROUTES
export const GETALLACTIONBYPROCESS = '/action/getAllActionsByProcess';

//COMMUNE ROUTES
export const GETCOMMUNESOF = '/commune/allCommuneOf';

//USER ROUTES
export const CREATEUSER = '/user/register';
export const GETUSERSWITHOUTDEPTO = '/users/GetUsersWithoutDepto';
export const GETINACTIVEUSERS = '/users/getInactiveUsers';
export const ASSINGDEPTO = '/user/assingCostCenter';
export const CHANGEUSERSTATUS = '/user/changeUserStatus';
export const GETUSERBYDEPTO = '/users/getUsersByDepto';
export const SETUSERMENU = '/user/setUserMenu';

//TAX DOCUMENT ROUTES
export const CREATETAXDOC = '/taxDocument/createTaxDocument';
export const GETALLTAXDOCUMENTS = '/taxDocument/getAllDocuments';
export const SEARCHANYDOCUMENT = '/taxDocument/searchAnyDocument';

//DELIVERY ROUTES
export const CREATEDELIVERYORDER = '/deliveryOrder/createDelivery';
export const GETALLDELIVERYORDERS = '/deliveryOrder/allDeliveryOrders';
export const SEARCHANYDELIVERYORDER = '/delivery/searchAnyOrder'

//COUNTRY ROUTES
export const CREATECOUNTRY = '/country/createCountry';
export const CREATECOMMUNECOUNTRY = '/commune/createCommune';
export const GETALLCOUNTRIES = '/country/allCountries';

//PRODUCTS ROUTES
export const CREATEPRODUCTS = '/products/createProduct';
export const GETPRODUCTSDATA = '/product/productsData';
export const GETPRODUCTSDATABYBRAND = '/product/filterProductByBrand';
export const GETPRODUCTSDATABYCATEGORY = '/product/filterProductByCategory';

//PRODUCT BRAND ROUTES
export const CREATEBRAND = '/productBrand/createBrand';
export const GETALLBRANDS = "/productBrand/getAllProductBrand";

//PRODUCT CATEGORY ROUTES
export const CREATECATEGORY = "/productCategory/createCategory"
export const GETALLCATEGORIES = "/productCategory/getAllCategories";

//ADDRESS ROUTES
export const GETALLSTORES = "/address/allStores";

//UPLOAD QUOTTION ROUTES
export const UPLOADFILE = "/uploads/";
export const DOWNLOADQUOTATIONFOLDER = "/request/downloadCuotations";

//PERMISSON ROUTES
export const GETALLPERMISSONS = '/permissons/getPermissons';

//VIEWS ROUTES
export const CREATEVIEW = '/views/createDataView';