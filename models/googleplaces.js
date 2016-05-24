function getplaces()
{
	$.ajax({
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDdCI0Csk73tnbL-nkBIPXu26U6pvb1weA&location=51.697352,5.304787&radius=1000&type=cafe",
            data: "",
            contentType: "application/json; charset=utf-8", 
            type: "GET",
			async: true,
            success: function (data) {
				alert(data);
            },
            error: function () {

            }
        });
}

function getplacedetails(id)
{
	$.ajax({
            url: "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDdCI0Csk73tnbL-nkBIPXu26U6pvb1weA&placeid="+id,
            data: "",
            contentType: "application/json; charset=utf-8", 
            type: "GET",
			async: true,
            success: function (data) {
				alert(data);
            },
            error: function () {

            }
        });
}
