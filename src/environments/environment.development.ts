export const environment = {
  production : false,
  cognito: {
    userPoolId: 'us-east-1_xD0JFohTE',
    userPoolWebClientId: '2drb2nt3dpp9kcspoq52onadn3'
      // userPoolId: 'us-east-1_rM9sKizSx',
      // userPoolWebClientId: '2jgc630i8tthj836ptst38l5hm'
    },
    API_ROUTES:{
      REGISTER_URL : 'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/user/register',
      FILE_UPLOAD_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/fileupload',
      GET_IMAGES_BY_LOCATION_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getfilesbylocation',
      GET_ALL_STATES_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getstates',
      GET_ALL_DISTRICTS_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getdistricts?id=',
      ISADMIN_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/isadmin',
      EDIT_FORM_DATA_URL:'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/user/',
    }
};