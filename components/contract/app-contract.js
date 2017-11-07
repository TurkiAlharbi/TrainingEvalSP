template = `
<div>
    <legend>Student Information</legend>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Name: </span><input id="stuname" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Major: </span><input id="major" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> ID: </span><input id="id" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Token: </span><input id="token" type="text" class="form-control"></div><br>
    <hr>
    <legend>Company Information</legend>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Company Name: </span><input id="company" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Address: </span><input id="address" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Country: </span><input id="country" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Zip code: </span><input id="zip" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> City: </span><input id="city" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> URL: </span><input id="url" type="text" class="form-control"></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Company business<br/>in brief:  </span><textarea id="textArea" rows=2 class="form-control"></textarea></div><br/>                    
    <hr>
    <legend>Training Opportunity</legend>
    <div class="input-group"><span class="input-group-addon"> Duration: </span>
    <div class="input-group-btn" data-toggle="buttons">
        <label class="btn btn-primary" style="width: 50%;"><input type="radio" name="options" value="summer">Summer Training<br/>(8 Weeks)</label>
        <label class="btn btn-primary" style="width: 50%;"><input type="radio" name="options" value="coop">Cooperative Work<br/>(28 Weeks)</label>
    </div></div><br/>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Location: </span><input id="location" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Transportation: </span><input id="trans" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Housing: </span><input id="housing" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Salary: </span><input id="salary" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Other benefits: </span><input id="benefits" type="text" class="form-control"></div><br>
    <hr>
    <legend>Mentor</legend>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Name: </span><input id="mentor" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Position: </span><input id="men_pos" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Email: </span><input id="men_email" type="text" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Phone: </span><input id="men_phone" type="tel" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Fax: </span><input id="fax" type="tel" class="form-control"></div><br>
    <div class="input-group"><span class="input-group-addon" style="min-width: 150px;"> Mobile: </span><input id="men_mobile" type="tel" class="form-control"></div><br>
    <br>
    <button class="btn btn-success" @click="submit">Submit</button>
</div>
`;

function submit() {
    // TBD
    // Requries validation and token testing
    var stuname = $("#stuname").val();
    var major = $("#major").val();
    var id = $("#id").val();
    var company = $("#company").val();
    var address = $("#address").val();
    var country = $("#country").val();
    var zip = $("#zip").val();
    var city = $("#city").val();
    var url = $("#url").val();
    var textArea = $("#textArea").val();
    var option = $(":checked").val();
    var location = $("#location").val();
    var trans = $("#trans").val();
    var housing = $("#housing").val();
    var salary = $("#salary").val();
    var benefits = $("#benefits").val();
    var mentor = $("#mentor").val();
    var men_pos = $("#men_pos").val();
    var men_email = $("#men_email").val();
    var men_phone = $("#men_phone").val();
    var fax = $("#fax").val();
    var men_mobile = $("#men_mobile").val();

    // TBD
    if (!testToken(token))
        return;

    json = {
        name: stuname,
        major: major,
        company: company,
        address: address,
        country: country,
        zip: zip,
        city: city,
        url: url,
        description: textArea,
        location: location,
        trans: trans,
        housing: housing,
        salary: salary,
        benefits: benefits,
        mentor: mentor,
        mentor_pos: men_pos,
        mentor_email: men_email,
        mentor_phone: men_phone,
        mentor_mobile: men_mobile,
        fax: fax,
    };

    update2DB("students/" + id, json);
    setTimeout(function () {
        window.location.href = "./contractSubmitted.html";
    }, 2500);
}
function testToken(token) {
    //TBD
    return true;
}


app_contract = {
    template: template
}

Vue.component("app-contract", app_contract);