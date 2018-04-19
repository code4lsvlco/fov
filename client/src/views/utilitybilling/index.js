import React, { Component } from 'react';
import axios from 'axios';
import { DefaultLayout } from '../common';
import { Paper } from 'material-ui';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryBar } from 'victory'
import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';
import moment from 'moment';
import _ from 'lodash';

const AccountInformation = (props) => {
  const a = props.account;
  return (
    <div>
      <div>{`${a.am_street_number} ${a.am_loc_pre_dir} ${a.am_location_street} ${a.am_loc_post_dir} ${a.am_loc_street_type}`}</div>
      <div>{`${a.am_loc_unit_type} ${a.am_location_unit}`}</div>
      <div>{`Account Type: ${a.am_account_type}`}</div>
      <div>{`Account Number: ${a.a_account_key}`}</div>
      <div>{`Location Code: ${a.a_account}`}</div>
      <div>{`Account Created: ${moment(a.am_acct_add_date).format('l')} ${moment(a.am_acct_add_date).format('LT')}`}</div>
    </div>
  )
}

const CustomerInformation = (props) => {
  const c = props.customer;
  return (
    <div>
      <div>{c.cs_name1}</div>
      <div>{c.cs_name2}</div>
      <div>{c.address1}</div>
      <div>{c.address2}</div>
      <div>{`Account Number: ${c.a_customer}`}</div>
      <div>{`Phone: ${c.cs_phone}`}</div>
      <div>{`Fax: ${c.cs_fax}`}</div>
      <div>{`Email: ${c.cs_email}`}</div>
      <div>{`${c.cs_city}, ${c.cs_state} ${c.cs_zip}, ${c.cs_country}`}</div>
      <div>{`cs_the: ${c.cs_the}  cs_nh_sw: ${c.cs_nh_sw}  cs_account_type: ${c.cs_account_type}  cs_resident: ${c.cs_resident}`}</div>
      <div>{`Last Updated by ${c.cs_updt_by}: ${moment(c.cs_updt_date).format('l')} ${c.cs_updt_time}`}</div>
    </div>
  )
}

const ServiceInformation = (props) => {
  const s = props.service;
  return (
    <div>
      <div><strong>a_service_mast_key:  </strong>{s.a_service_mast_key}</div>
      <div><strong>a_acct_cust_key:  </strong>{s.a_acct_cust_key}</div>
      <div><strong>a_service_code:  </strong>{s.a_service_code}</div>
      <div><strong>a_service_sequence:  </strong>{s.a_service_sequence}</div>
      <div><strong>sm_service_status:  </strong>{s.sm_service_status}</div>
      <div><strong>sm_serv_start_date:  </strong>{s.sm_serv_start_date}</div>
      <div><strong>sm_serv_stop_date:  </strong>{s.sm_serv_stop_date}</div>
      <div><strong>sm_customer_type:  </strong>{s.sm_customer_type}</div>
      <div><strong>sm_service_service_type:  </strong>{s.sm_service_service_type}</div>
      <div><strong>sm_bill_rate_code:  </strong>{s.sm_bill_rate_code}</div>
      <div><strong>sd_bill_prev_read:  </strong>{s.sd_bill_prev_read}</div>
      <div><strong>sd_prev_read_date:  </strong>{s.sd_prev_read_date}</div>
      <div><strong>sd_meter_remote_id:  </strong>{s.sd_meter_remote_id}</div>
    </div>
  )
}

const MeterInformation = (props) => {
  const m = props.meter;
  return (
    <div>
      <div>a_meter_key:  {m.a_meter_key}</div>
      <div>mt_manufact_code:  {m.mt_manufact_code}</div>
      <div>mt_serial_number:  {m.mt_serial_number}</div>
      <div>mt_install_date:  {m.mt_install_date}</div>
      <div>md_initial_reading:  {m.md_initial_reading}</div>
      <div>mt_service_cat:  {m.mt_service_cat}</div>
      <div>md_meter_size:  {m.md_meter_size}</div>
      <div>a_meter_key:  {m.a_meter_key}</div>
    </div>
  )
}

class UtilityBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      account: {},
      service: {},
      meter: {},
      consumption: []
    };
  }

  componentDidMount() {
    axios.all([
      // City Hall
      axios.get('/api/ian/ub/ub_customers/a_customer/1239'),
      axios.get('/api/ian/ub/ut_account_master/a_account_key/6432'),
      axios.get('/api/ian/ub/ut_service_master/a_meter_det_key/6432'),
      axios.get('/api/ian/ub/ut_meters/a_meter_det_key/6432'),
      axios.get('/api/ian/ub/ut_consumption/a_meter_det_key/6432')
    ])
    .then(axios.spread((apiCustomer, apiAccount,apiService,apiMeter,apiConsumption) => {
      console.log(apiCustomer.data.recordsets[0][0]);
      console.log(apiAccount.data.recordsets[0][0]);
      console.log(apiService.data.recordsets[0][0]);
      console.log(apiMeter.data.recordsets[0][0]);
      console.log(apiConsumption.data.recordsets[0]);

      let consumption = apiConsumption.data.recordsets[0].map((c) => {return {date: parseInt(moment(c.bt_meter_read_date).unix()), usage: c.bt_actual_usage};})
      consumption = consumption.sort(function(a,b){return new Date(b.date) - new Date(a.date);});
      this.setState({
        customer: apiCustomer.data.recordsets[0][0],
        account: apiAccount.data.recordsets[0][0],
        service: apiService.data.recordsets[0][0],
        meter: apiMeter.data.recordsets[0][0],
        consumption: consumption
      });
    }));
  }

  percentile = (arr, p) => {
      if (arr.length === 0) return 0;
      if (typeof p !== 'number') throw new TypeError('p must be a number');
      if (p <= 0) return arr[0];
      if (p >= 1) return arr[arr.length - 1];

      var index = arr.length * p,
          lower = Math.floor(index),
          upper = lower + 1,
          weight = index % 1;

      if (upper >= arr.length) return arr[lower];
      return arr[lower] * (1 - weight) + arr[upper] * weight;
  }

  render() {
    let consumption = this.state.consumption;
    consumption = _.sortBy(consumption,'date');
    let usage = consumption.map((c) => parseInt(c.usage));
    const y95Percentile = Math.ceil(this.percentile(usage,80) * 1.20);
    let years = consumption.map((c) => parseInt(moment.unix(c.date).format('YYYY')));
    years = _.uniq(years).sort();
    years = years.map((y) => parseInt(moment(`${y}-01-01T00:00:00.000Z`).format('X')));
    var annualConsumption =_(consumption)
      .groupBy((c) => moment.unix(c.date).format('YYYY'))
      .map((objs, key) => ({
          'date': key,
          'usage': _.sumBy(objs, 'usage') }))
      .value();
    return (
      <DefaultLayout>
        <Grid>
          <Cell col={12}>
            <Paper>
              <div style={{padding: 20}}>
                <div style={{float: 'left',width: '33%'}}>
                  <h2>Account</h2>
                  <AccountInformation account={this.state.account}/>
                </div>
                <div style={{float: 'left',width: '33%'}}>
                  <h2>Customer</h2>
                  <CustomerInformation customer={this.state.customer}/>
                </div>
                <div style={{float: 'left',width: '33%'}}>
                  <h2>Meter</h2>
                  <MeterInformation meter={this.state.meter}/>
                </div>
              </div>
              <div style={{clear: 'both', marginBottom: 20}}></div>
              <div style={{padding: 20}}>
                <div style={{float: 'left',width: '33%'}}>
                  <h2>Service</h2>
                  <ServiceInformation service={this.state.service}/>
                </div>
                <div style={{float: 'left', width: '67%', marginBottom: 40}}>
                  <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    width={400}
                    height={200}
                    padding={{ left: 40, bottom: 70 }}
                    // domain={{ x: [0.5, 5.5], y: [0, 10] }}
                    domain={{ y: [0, y95Percentile] }}
                    domainPadding={20}
                    theme={VictoryTheme.material}
                  >
                    <VictoryAxis
                      label="Date"
                      axisLabelComponent={<VictoryLabel dy={50}/>}
                      tickFormat={(t) => `${moment.unix(t).add(1,'days').format('MMM YY')}`}
                      tickLabelComponent={<VictoryLabel dx={-20} dy={-5} angle={-45}/>}
                      // tickCount={5}
                      tickValues={years}
                    />
                    <VictoryAxis dependentAxis
                      label="Usage (1,000 Gallons)"
                      axisLabelComponent={<VictoryLabel dy={-35}/>}
                      tickFormat={(t) => `${t}k`}
                    />
                    <VictoryBar
                      labels={(d) => {return `${moment.unix(d.x).format('MMM')}: ${d.y}`}}
                      // labels={0}
                      labelComponent={<VictoryTooltip/>}
                      data={consumption}
                      x='date'
                      y='usage'
                    />
                  </VictoryChart>
                  <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    width={400}
                    height={200}
                    padding={{ left: 40, bottom: 70 }}
                    // domain={{ x: [0.5, 5.5], y: [0, 10] }}
                    // domain={{ y: [0, y95Percentile] }}
                    domainPadding={20}
                    theme={VictoryTheme.material}
                  >
                    <VictoryAxis
                      label="Date"
                      axisLabelComponent={<VictoryLabel dy={50}/>}
                      // tickFormat={(t) => `${moment.unix(t).add(1,'days').format('YYYY')}`}
                      tickLabelComponent={<VictoryLabel dx={-20} dy={-5} angle={-45}/>}
                      // tickCount={5}
                      tickValues={years.map((y) => moment.unix(y).add(1,'days').format('YYYY'))}
                    />
                    <VictoryAxis dependentAxis
                      label="Usage (1,000 Gallons)"
                      axisLabelComponent={<VictoryLabel dy={-35}/>}
                      tickFormat={(t) => `${t}k`}
                    />
                    <VictoryBar
                      labels={(d) => d.y}
                      // labels={0}
                      labelComponent={<VictoryTooltip/>}
                      data={annualConsumption}
                      x='date'
                      y='usage'
                    />
                  </VictoryChart>
                </div>
              </div>
              <div style={{clear: 'both', marginBottom: 20}}></div>
            </Paper>
          </Cell>
        </Grid>
      </DefaultLayout>
    )
  }
}

export { UtilityBilling };
