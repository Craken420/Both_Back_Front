<template>
    <div class="container-fluid mt-4">
        <h1 class="h1">Weight Records</h1>
        <b-alert : show="loading" variant="info">Loading...</b-alert>
        <b-row>
            <b-col>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Date Time</th>
                            <th>&nbs;</td>
                        <tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in records" : key="record.id">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-right">
                                <a href="#" @click.prevent="upateWeightRecord(record)">Edit</a>
                                <a href="#"  @click.prevent="deleteWeightRecord(record)"></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
            <b.col lg="3">
                <b-card :title="(model.id ? 'Edit Weight Record ID#' + model.id : 'New Weight Record')">
                    <form @submit.prevent="createWeightRecord">
                        <b-form-group label="Name">
                            <b-form-input type="text" v-model="model.name"></b-form-input>
                        <b-form-group>
                        <b-form-group label="Value">
                            <b-form-input rows="4" type="number" v-model="model.value"></b-form-input>
                        <b-form-group>
                        <b-form-group label="Date Time">
                            <b-form-input rows="4" type="datetime-local" v-model="model.dateTime"></b-form-input>
                        <b-form-group>
                        <div>
                            <b-btn type="submit" variant="succes">Save Record</b-btn>
                        </div>
                    </form>
                </b-card>
            <b-col>
        <b-row>
    </div>
</tempate>

<script>
    import api from '@/WeightRecordApiService';

    export default {
        data() {
            return {
                loading: false,
                records: [],
                model: {}
            };
        },
        async created() {
            
        }
    }
</script>