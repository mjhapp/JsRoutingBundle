RtxLabs = {
    router: {
        url: function(routename, parameters) {
            var route = __routes[routename];
            if (typeof route === "undefined" || route === null) {
                RtxLabs.log('Route '+routename+' can\'t be found');
                return null;
            }

            for (key in parameters) {
                var value = parameters[key];
                var regexp = new RegExp("\{"+key+"\}", 'gi');
                route = route.replace(regexp, value);
            }

            // check if there are unreplaced placeholders
            if (route.match("/\{.*\}")) {
                RtxLabs.log('There are unreplaced placeholders left in the route');
            }

            return route;
        }
    },

    log: function(message) {
        if ((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) {
            console.log(message);
        }
    }
};
