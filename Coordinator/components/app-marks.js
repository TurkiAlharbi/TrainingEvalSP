app_marks_template = `
<div>
    <v-data-table v-bind:headers="headers" :items="students" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.mark }}</td>
        </template>
    </v-data-table>
</div>
`;

var headers = [
    { text: 'ID', value: 'id', align: "center" },
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Mark', value: 'mark', align: "center" },
];

var students = [
    { id: "201224780", name: "Ibrahim Al-Beladi", mark: "35 / 40" },
    { id: "201237940", name: "Mohammed Alhumaidi", mark: "33 / 40" },
];

app_marks = {
    template: app_marks_template,
};

Vue.component('app-marks', app_marks);