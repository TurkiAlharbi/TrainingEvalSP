app_assign_advisors_template = `
<div>
    <button class="btn btn-info" @click="distribute">Distribute students over advisors</button>
    <hr/>
    <table class="table table-bordered">
        <thead>
            <tr role="row">
                <th ></th>
                <th v-for="advisor in advisors" style="text-align:center">{{ advisor }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="student in students">
                <td>{{ student }}</td>
                <td v-for="(advisor,index) in advisors">
                    <input type="radio" :name="student" :value="index+1">
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-success">Save</button>
</div>
`;

advisors = [
    "Advisor #1", "Advisor #2", "Advisor #3",
];

students = [
    "Student #1", "Student #2", "Student #3", "Student #4", "Student #5", "Student #6", "Student #7", "Student #8", "Student #9", "Student #10",
]
app_assign_advisors = {
    template: app_assign_advisors_template,
};

Vue.component('app-assign-advisors', app_assign_advisors);

function distribute() {
    radios = $("input:radio");
    adv = advisors.length;
    stu = students.length;
    for (var s = 0; s < stu; s++)
        for (var a = 0; a < adv; a++)
            if (s % adv == a % adv)
                radios[s * adv + a].click();
}