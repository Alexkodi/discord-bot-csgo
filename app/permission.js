function checkPermissionCSGOadmin(userRole) {
	return userRole.some((role) => role.name === "CSGOadmin");
}

function checkPermissionCSGO(userRole) {
	return userRole.some((role) => role.name === "CSGO");
}

module.exports = {
    checkPermissionCSGOadmin,
    checkPermissionCSGO
}