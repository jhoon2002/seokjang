import http from "@/api/http";
import qs from "qs";

export function fetchCount(model, obj) {
    console.log("fetchCount: http.get(" + "'/api/" + model + "/count', parameters)", obj);
    return http.get("/api/" + model + "/count", {
        params: obj,
        paramsSerializer: params => {
            return qs.stringify(params, {allowDots: true, encode: false })
        }
    });
}

export function fetchData(model, obj) {
    console.log("fetchData: http.get(" + "'/api/" + model + "', parameters)", obj);
    return http.get("/api/" + model, {
        params: obj,
        paramsSerializer: params => {
            return qs.stringify(params, {allowDots: true, encode: false })
        }
    });
}

export function fetchOne(model, id) {
    console.log("fetchOne: http.get(" + "'/api/" + model + "/" + id + "'");
    return http.get("/api/" + model + "/" + id);
}

export function fetchEmployee(userid) {
    console.log("fetchEmployee: http.get(" + "'/api/employee/uid/" + userid + "'");
    return http.get("/api/employee/uid/" + userid);
}

export function create(model, obj) {
    console.log("create: http.post(" + "'/api/" + model + "/new', parameters)", obj);
    return http.post("/api/" + model + "/new", obj);
}