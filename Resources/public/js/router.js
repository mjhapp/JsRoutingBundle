RtxLabs = {
    router: {
        url: function(routename, parameters) {
            var route = __routes[routename];
            if (typeof route === "undefined" || route === null) {
                RtxLabs.log('Route '+routename+' can\'t be found');
                return null;
            }

            var extraparameters = [];
            for (key in parameters) {
                var value = parameters[key];
                var regexp = new RegExp("\{"+key+"\}", 'gi');
                var newroute = route.replace(regexp, value);
                if (route == newroute)
                {
                    extraparameters[key] = value;
                }
                route = newroute;
            }

            // check if there are unreplaced placeholders
            if (route.match("/\{.*\}")) {
                RtxLabs.log('There are unreplaced placeholders left in the route');
            }

            var extra_size = 0;
            for (key in extraparameters)
            {
                extra_size += 1;
            }

            if (extra_size > 0)
            {
                route = route + '?';
            }

            for (key in extraparameters)
            {
                route = route + key + '=' + extraparameters[key] + '&';
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
