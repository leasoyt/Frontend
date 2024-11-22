export class Pages {
    static readonly REGISTER = "/register";
    static readonly USER = "/user";
    static readonly LOGIN = "/login";
    static readonly MANAGER = "/manager";
    static readonly FUNCTIONALITIES = "/functionalities";
    static readonly OUR_REVIEWS = "/reviews";
    static readonly PLANS = "/plans";
    static readonly SEARCH = "/search";
    static readonly CONTACT = "/contact-us";
    static readonly CUSTOMER_SERVICE = "/customer-service";
    static readonly SUCCESS_PAYMENT = "/success-payment"
    static readonly ADMIN = "/admin";

    static readonly user = {
        CONFIG: `${this.USER}/settings`,
        PROFILE: `${this.USER}/profile`,
    };

    static readonly register = {
        USER: `${this.REGISTER}/user`,
        RESTAURANT: `${this.REGISTER}/establishment`,
    };

    static readonly manager = {
        TABLES: `${this.MANAGER}/tables`,
        CONFIG: `${this.MANAGER}/configuration`,
        PRODUCTS: {
            BASE: `${this.MANAGER}/products`,
            NEW: `${this.MANAGER}/products/new`,
        },

        EMPLOYEES: {
            BASE: `${this.MANAGER}/employees`,
            NEW: `${this.MANAGER}/employees/new`,
            WAITERS: `${this.MANAGER}/employees/waiters`,
        },
        
        RESERVATIONS: {
            BASE: `${this.MANAGER}/reservations`,
            NEW: `${this.MANAGER}/reservations/new`,
            LIST: `${this.MANAGER}/reservations/list`,
        },

        SUBSCRIPTION: {
            BASE: `${this.MANAGER}/subscription`,
            PAYMENT: `${this.MANAGER}/subscription/payment`,
            PLAN: `${this.MANAGER}/subscription/plan`,
        }
    }
}