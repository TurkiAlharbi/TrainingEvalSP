template = `
<div>
    <v-form v-model="valid">
        <v-btn @click='
            if(window.location.hash != ""){
                id = element(0);
                type = element(1);
                terms = element(2);
                major = element(3);
                token = element(4);
            }
        ' style="display:none"></v-btn>
        <app-expandable title="Student Information" expanded="true">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 justify-center>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Name" id="stuname" v-model="stuname" prepend-icon="face" required :rules="nameRules"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Mobile Number" id="stumobile" v-model="stumobile" prepend-icon="smartphone" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Major" id="major" v-model="major" prepend-icon="local_library" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="ID Number" id="id" v-model="id" prepend-icon="credit_card" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Training Type" id="type" v-model="type" prepend-icon="school" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Period" id="terms" v-model="terms" prepend-icon="av_timer" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Token" id="token" v-model="token" prepend-icon="vpn_key" required :rules="required"></v-text-field>
                </v-flex>
            </v-layout>
        </app-expandable>


        <app-expandable title="Company Information" expanded="true">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Company Name" id="company" v-model="company" prepend-icon="location_city" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Country" id="country" v-model="country" prepend-icon="flag"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="City" id="city" v-model="city" prepend-icon="map"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Address" id="address" v-model="address" prepend-icon="location_searching"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Zip code" id="zip" v-model="zip" prepend-icon="move_to_inbox"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="URL" id="url" v-model="url" prepend-icon="computer"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="Brief about company business" id="textArea" v-model="textArea" prepend-icon="message" multi-line rows=3></v-text-field>
                </v-flex>
            </v-layout>
        </app-expandable>


        <app-expandable title="Training Opportunity" expanded="true">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Location" id="location" v-model="location" prepend-icon="business" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Salary" id="salary" v-model="salary" prepend-icon="attach_money" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Transportation" id="trans" v-model="trans" prepend-icon="directions_run"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Housing" id="housing" v-model="housing" prepend-icon="home"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Other Benefits" id="benefits" v-model="benefits" prepend-icon="card_membership"></v-text-field>
                </v-flex>
            </v-layout>
        </app-expandable>

        <app-expandable title="Mentor" expanded="true">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Name" id="mentor" v-model="mentor" prepend-icon="supervisor_account" required :rules="nameRules"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Position" id="men_pos" v-model="men_pos" prepend-icon="credit_card" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Mobile Number" id="men_mobile" v-model="men_mobile" prepend-icon="smartphone" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Email" id="men_email" v-model="men_email" prepend-icon="email" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Phone Number" id="men_phone" v-model="men_phone" prepend-icon="phone" required :rules="required"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field style="width:90%" class="ml-2 mr-2" label="Fax" id="fax" v-model="fax" prepend-icon="inbox"></v-text-field>
                </v-flex>
            </v-layout>
        </app-expandable>
        <v-layout justify-center>
            <v-btn class="green white--text" @click="submit" :disabled="!valid">Submit</v-btn>
        </v-layout>
    <v-form>
</div>
`;


function submit() {
    // TBD
    // Requries validation and token testing
    var stuname = $("#stuname").val();
    var mobile = $("#stumobile").val();
    var major = $("#major").val();
    var id = $("#id").val();
    var company = $("#company").val();
    var address = $("#address").val();
    var country = $("#country").val();
    var zip = $("#zip").val();
    var city = $("#city").val();
    var url = $("#url").val();
    var textArea = $("#textArea").val();
    var option = $("#type").val();
    var terms = $("#terms").val();
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

    id = "s" + id;

    period = terms + " " + "(" + option + ")";

    json = {
        "name": stuname,
        "supervisor": men_email,
        "company": company,
        "period": period,
        "mobile": mobile,
        // "major": major
    };

    // add student's main pieces of information
    update2DB("students/" + id, json);

    json = {
        "company   country": country,
        "company  city": city,
        "company  location": location,
        "company address": address,
        "company description": textArea,
        "company url": url,
        "company zip": zip,

        "salary": salary,
        "salary  housing": housing,
        "salary  transportation": trans,
        "salary - benefits": benefits,

        "supervisor email": men_email,
        "supervisor name": mentor,
        "supervisor position": men_pos,
        "supervisor phone": men_phone,
        "supervisor mobile": men_mobile,
        "supervisor fax": fax,
    };

    // add to contracts
    update2DB("contracts/" + id, json);

    // add to supervisor's list
    update2DB("supervisors/" + men_email.split(".").join(" ") + "/students", { [id]: "" });

    // Go to contract submitted page
    setTimeout(function () {
        window.location.href = "./contractSubmitted.html";
    }, 2500);
}

function testToken(token) {
    //TBD
    return true;
}

function element(i) {
    return decodeURIComponent(window.location.hash.substr(1).split("&")[i].split("=")[1]);
}

app_contract = {
    template: template,
    data() {
        return {
            valid: false,

            stuname: '',
            stumobile: '',
            major: '',
            id: '',
            type: '',
            terms: '',
            token: '',
            company: '',
            address: '',
            country: '',
            zip: '',
            city: '',
            url: '',
            textArea: '',
            location: '',
            trans: '',
            housing: '',
            salary: '',
            benefits: '',
            mentor: '',
            men_pos: '',
            men_email: '',
            men_phone: '',
            fax: '',
            men_mobile: '',

            required: [
                (v) => !!v || 'Required',
            ],
            nameRules: [
                (v) => !!v || 'Name is required',
            ],
        };
    },
    mounted() {
        document.getElementsByTagName("button")[0].click();
    }
};

Vue.component("app-contract", app_contract);
