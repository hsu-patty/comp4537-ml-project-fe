/** Strings that will be displayed to user  */
const MESSAGES = {
    /** For Admin.js */
    //error messages
    ACCESS_DENY_ERROR: "Access denied. Admins only.",
    FETCH_ERROR: "Failed to fetch users and API stats. Please try again.",
    FAIL_TO_DELETE_ERROR: "Failed to delete user. Please try again.",
    //confirm messages
    CONFIRM_DELETION: "Are you sure you want to delete this user?",
    //success messages
    USER_DELETE_SUCCESS: "User deleted successfully.",

    /** For Dashboard.js  */
    API_STATUS: "API Calls Used : %1",
    FAIL_TO_FETCH_USER_TYPE: "Failed to fetch user type. Please try again.",

    /** For EditUser.js */
    //error
    FAIL_TO_FETCH_USER_DETAIL: "Failed to fetch user details.",

    //alert
    PASSWORD_ALERT: "Please enter your current password.",
    INCORRECT_PASSWORD_ALERT: "Please make sure you entered your current password correctly.",

    //success
    UPDATE_SUCCESS: "Profile updated successfully.",

    /** For Home.js */
    /** For Login.js */
    /** For protectedRoute.js */
    /** For Recommandation.js */
    /** For Register.js */
};

module.exports = MESSAGES;