var express = require('express');
var router = express.Router();

var sqlIan = require('mssql');
var config_mutest = {
    user: process.env.IAN_NEW_USER,
    password: process.env.IAN_NEW_PASSWORD,
    server: process.env.IAN_NEW_SERVER_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.IAN_NEW_SERVER_PORT,
    database: process.env.IAN_DATABASE_NEW_SERVER
};

try {
  console.log("Creating sqlPoolMu113");
  var sqlPoolMuTest = new sqlIan.ConnectionPool(config_mutest).connect();
}
catch(e) {;
  console.log("Failed sqlPoolMu113");
  console.log("ian-ub.js");
  console.log(e);
}

var getTop100 = function(table, res, select) {
  if (!select) select = '*';
  sqlPoolMuTest.then(function(pool) {
    return pool.request().query('SELECT TOP 100 ' + select + ' FROM ' + table + ';')
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

var getQuery = function(query,res) {
  sqlPoolMuTest.then(function(pool) {
    return pool.request().query(query)
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

router.get('/', function(req, res, next) {
  res.json({ title: 'api/ian-ub' });
});

// {
//   "utsvm_key": 501,
//   "utsvm_utacd_key": 501,
//   "utsvm_serv_code": "1000  ",
//   "utsvm_serv_seq": 1,
//   "utsvm_serv_status": "A",
//   "utsvm_start_date": "2010-03-10T00:00:00.000Z",
//   "utsvm_stop_date": "9999-12-31T00:00:00.000Z",
//   "utsvm_alloc": 0,
//   "utsvm_ar_cat": 60,
//   "utsvm_bud_periods": 0,
//   "utsvm_budget_amt": 0,
//   "utsvm_budget_bal": 0,
//   "utsvm_budget_plan": "N",
//   "utsvm_condo_units": 0,
//   "utsvm_convert": "Y",
//   "utsvm_cr_amt": 0,
//   "utsvm_cr_status": "  ",
//   "utsvm_cust_type": "RE",
        // LV,142
        // RO,37
        // IR,34
        // MF,1160
        // RE,37980
        // CI,1854
//   "utsvm_cycle_code": 12,
//   "utsvm_daily_base": 0,
//   "utsvm_discount_pct": 0,
//   "utsvm_factor_old": 0,
//   "utsvm_factor2": 0,
//   "utsvm_filler": "                                                  ",
//   "utsvm_final": "N",
//   "utsvm_last_commit": "CN0001",
//   "utsvm_last_run": "C3",
//   "utsvm_meter_flag": " ",
//   "utsvm_rate_adj": "Y",
//   "utsvm_read_seq": 1500,
//   "utsvm_route_book": "62    ",
//   "utsvm_seas_remain": 0,
//   "utsvm_seasonal": "N",
//   "utsvm_serv_type": "M",
//   "utsvm_status_final": " ",
//   "utsvm_status_type": " ",
//   "utsvm_serv_id": "               ",
//   "utsvm_rate_code": "WT10",
        // IR10
        // SR75, SR10, SR15, SR20, SR30, SR40, SR60
        // HW0, HW1, HW2
        // WT0, WT75, WT10, WT15, WT20, WT30, WT40, WT60
        // SW1, SW2
        // IR75, IR15, IR20
        // SM1, SM2
        // ST1, ST2
//   "utsvm_factor": 1,
//   "utsvm_factor_type": "1",
//   "utsvm_mlt_mtr_mth": " ",
//   "utsvm_naics": "      ",
//   "utsvm_sic_cat": "    ",
//   "utsvm_sic_type": "    ",
//   "utsvm_app_status": "X",
//   "utsvm_sic_conc": 0,
//   "utsvm_pay_plan": " ",
//   "utsvm_bud_amort": 0
// }

// router.get('/services/master', function(req, res, next) {
//   getTop100("dbo.utsvcmst",res);
// });

// {
//   "a_service_mast_key": 501,
//   "a_acct_cust_key": 501,
//   "a_service_code": "1000  ",
//   "a_service_sequence": 1,
//   "sm_service_status": "A",
//   "sm_serv_start_date": "2010-03-10T00:00:00.000Z",
//   "sm_serv_stop_date": "9999-12-31T00:00:00.000Z",
//   "sm_gl_alloc_code": 0,
//   "sm_ar_category": 60,
//   "sm_number_periods": 0,
//   "sm_budget_bill_amt": 0,
//   "sm_budget_balance": 0,
//   "sm_bud_plan_flag": "N",
//   "sm_number_of_units": 0,
//   "sm_converted_flag": "Y",
//   "sm_serv_credit_amt": 0,
//   "sm_credit_status": "  ",
//   "sm_customer_type": "RE",
//   "sm_cycle_code": 12,
//   "sm_daily_base_use": 0,
//   "sm_discount_pct": 0,
//   "sm_factor_old": 0,
//   "sm_factor2": 0,
//   "sm_filler": "                                                  ",
//   "sm_final_bill_flag": "N",
//   "sm_last_commitment": "CN0001",
//   "sm_last_bill_run": "C3",
//   "sm_meter_flag": " ",
//   "sm_rate_adj_flag": "Y",
//   "sm_read_sequence": 1500,
//   "sm_route_book": "62    ",
//   "sm_remain_seas_bal": 0,
//   "sm_seasonal_flag": "N",
//   "sm_service_type": "M",
        // F,27146
        // M,7183
        // O,6878
//   "sm_final_status": " ",
//   "sm_status_type": " ",
//   "sm_service_id": "               ",
//   "sm_bill_rate_code": "WT10",
//   "sm_mult_factor": 1,
//   "sm_factor_type": "1",
//   "sm_multi_meter_mth": " ",
//   "sm_naics_sic_code": "      ",
//   "sm_sic_code_cat": "    ",
//   "sm_sic_type": "    ",
//   "sm_appl_status": "X",
//   "sm_full_concen_amt": 0,
//   "sn_note_sequence": null,
//   "sn_note_code": null,
//   "sn_note_type": null,
//   "sn_text1": null,
//   "sn_text2": null,
//   "sn_note_filler": null,
//   "sr_establish_time": 0,
//   "sr_filler": "                                                  ",
//   "sr_winter_qtr_stat": " ",
//   "sr_establish_meth": " ",
//   "sr_prev_usage_flag": " ",
//   "sr_prev_usage": 0,
//   "sr_curr_usage_flag": " ",
//   "sr_current_usage": 0,
//   "ss_ar_category": null,
//   "ss_serv_chg_seq": null,
//   "ss_subj_to_chg": null,
//   "ss_addl_chg_filler": null,
//   "sx_sales_tax_seq": null,
//   "sx_calc_order": null,
//   "sx_sales_tx_filler": null,
//   "sx_serv_code_taxed": null,
//   "sx_serv_seq_taxed": null,
//   "mm_secondary_acct": null,
//   "mm_sec_serv_code": null,
//   "mm_sec_serv_seq": null,
//   "mm_sec_filler": null,
//   "so_boo_serv_code": null,
//   "so_boo_num_periods": null,
//   "so_boo_ser_seq": null,
//   "so_boo_read_date": null,
//   "so_boo_filler": null,
//   "so_boo_usage_amt": null,
//   "st_number_of_bills": null,
//   "st_bills_remaining": null,
//   "st_bill_remain_flg": null,
//   "st_bill_percent": null,
//   "st_bill_credit": null,
//   "sf_flat_item_seq": null,
//   "a_flat_item_key": null,
//   "sf_flat_item_code": null,
//   "sf_flat_itm_filler": null,
//   "sf_flat_item_qty": null,
//   "sf_flat_item_size": null,
//   "sf_flat_item_start": null,
//   "sf_flat_itm_status": null,
//   "sf_flat_item_stop": null,
//   "sf_flat_item_type": null,
//   "sf_item_unit_cost": null,
//   "sf_unit_usage": null,
//   "sf_item_prev_read": null,
//   "sf_total_cost": null,
//   "sd_serv_meter_type": "C",
//   "sd_last_bill_read": 0,
//   "sd_bill_prev_read": 2709,
//   "sd_dmd_multiplier": 0,
//   "sd_old_meter_dials": 0,
//   "sd_dmd_pwr_factor": 0,
//   "sd_serv_det_filler": "                                                  ",
//   "sd_num_prev_est": 0,
//   "sd_credit_percent": 0,
//   "sd_curr_read_date": null,
//   "sd_prev_read_date": "2017-09-20T00:00:00.000Z",
//   "sd_meter_remote_id": "27554638       ",
//   "sd_replace_usage": 0,
//   "a_meter_det_key": 501,
//   "a_meter_det_key2": null,
//   "sd_comment": "                                        ",
//   "sm_pay_plan": " ",
//   "sr_winter_avg_date": null,
//   "sr_winter_avg_override": " ",
//   "sm_serv_key_link": "501                 "
// }

router.get('/ut_service_master/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  // if (field === "top100") return getTop100("dbo.ut_account_master",res);
  let query = `SELECT * FROM dbo.ut_service_master WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "utsmt_utsvm_key": 501,
//   "utsmt_type": "C",
//   "utsmt_act_read": 0,
//   "utsmt_act_read_p": 2709,
//   "utsmt_demand_multi": 0,
//   "utsmt_dials_old": 0,
//   "utsmt_dmd_pwr_fact": 0,
//   "utsmt_filler": "                                                  ",
//   "utsmt_prev_est_no": 0,
//   "utsmt_prim_credit": 0,
//   "utsmt_read_date": null,
//   "utsmt_read_date_p": "2017-09-20T00:00:00.000Z",
//   "utsmt_remote_id": "27554638       ",
//   "utsmt_usage": 0,
//   "utsmt_utmtd_key": 501,
//   "utsmt_utmtd_o_key": null,
//   "utsmt_comment": "                                        ",
//   "utsmt_dmd_read": 0,
//   "utsmt_dmd_read_p": 0,
//   "utsmt_kvar_read": 0,
//   "utsmt_kvar_read_p": 0,
//   "utsmt_act_dmd": 0,
//   "utsmt_act_kvar": 0
// }
// COUNT: 7183

// router.get('/services/meter', function(req, res, next) {
//   getTop100("dbo.utsvcmtr",res);
// });

// {
//   "utmtm_key": 501,
//   "utmtm_man_code": "BAD ",
        // BAD , 6905
        // DUPE, 10
        // ORI , 219
        // X   , 34
//   "utmtm_meter": "20172454       ",
//   "utmtm_status": "U",
//   "utmtm_asset": "               ",
//   "utmtm_cond_code": "    ",
//   "utmtm_convert": "Y",
//   "utmtm_cost": 0,
//   "utmtm_filler": "                                                  ",
//   "utmtm_install_date": "2010-03-10T00:00:00.000Z",
//   "utmtm_nxt_cal_date": null,
//   "utmtm_purch_date": null,
//   "utmtm_retire_date": null,
//   "utmtm_return_date": null,
//   "utmtm_service_date": null,
//   "utmtm_serv_cat": "W",
//   "utmtm_compound": " ",
//   "utmtm_order": "                    ",
//   "utmtm_cmltv_dmd": " ",
//   "utmtm_kvarh": " "
// }
// COUNT: 7168

// router.get('/meters/master', function(req, res, next) {
//   getTop100("dbo.utmtrmst",res);
// });

// {
//   "a_meter_key": 516,
//   "mt_manufact_code": "BAD ",
//   "mt_serial_number": "20254164       ",
//   "mt_inv_status": "U",
//   "mt_fixed_asset": "               ",
//   "mt_meter_condition": "    ",
//   "mt_converted_flag": "Y",
//   "mt_meter_cost": 0,
//   "mt_meter_filler": "                                                  ",
//   "mt_install_date": "2010-09-27T00:00:00.000Z",
//   "mt_next_cal_date": null,
//   "mt_purchased_date": null,
//   "mt_retired_date": null,
//   "mt_inv_return_date": null,
//   "mt_last_serv_date": null,
//   "mt_service_cat": "W",
//   "mt_compound_flag": " ",
//   "mt_inv_stock_num": "                    ",
//   "mc_sequence": null,
//   "mc_account": null,
//   "mc_removed_date": null,
//   "mc_final_read": null,
//   "mc_filler": null,
//   "mc_service_code": null,
//   "mc_service_seq": null,
//   "mc_connect_date": null,
//   "mc_first_read_date": null,
//   "mc_comment": null,
//   "a_meter_det_key": 516,
//   "md_sequence": 1,
//   "md_device_code": "R",
//   "md_num_dials_read": 4,
//   "md_conv_factor": 1,
//   "md_detail_filler": "                                                  ",
//   "md_num_fixed_zeros": 0,
//   "md_meter_size": "75        ",
//   "md_meter_type": "Y",
//   "md_met2_serial_num": "               ",
//   "md_met3_serial_num": "               ",
//   "md_meter_model": "          ",
//   "md_initial_reading": 0,
//   "md_test_circle_cd": "03",
//   "md_dev_flow_type": "N   ",
//   "md_demand_position": 0,
//   "md_demand_decimal": 0,
//   "md_reg_pressure": 0,
//   "md_attach_to_serv": "Y",
//   "md_rem_id_serial": "27483400       ",
//   "md_cast_id_number": "               ",
//   "md_addl_reference": "               ",
//   "ml_k_value": null,
//   "ml_reg_ratio_value": null,
//   "ml_meter_amperage": null,
//   "ml_phase_code": null,
//   "ml_meter_voltage": null,
//   "ml_wire_code": null,
//   "ml_elec_met_filler": null,
//   "me_equipment_seq": null,
//   "me_equip_status": null,
//   "me_equip_filler": null,
//   "me_addl_info": null,
//   "me_item_code": null,
//   "me_item_desc": null,
//   "me_equip_return_dt": null,
//   "mt_meter_key_link": "BAD  20254164       "
// }
// COUNT: 7183

router.get('/ut_meters/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  let query = `SELECT * FROM dbo.ut_meters WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "utacm_key": 501,
//   "utacm_account": "462958800                     ",
//   "utacm_start_date": "2010-03-10T00:00:00.000Z",
//   "utacm_stop_date": "9999-12-31T00:00:00.000Z",
//   "utacm_type": "RE",
//   "utacm_parcel": "                              ",
//   "utacm_prop_desc": "                                                                 ",
//   "utacm_district": "3 ",
//   "utacm_loc_apt": "     ",
//   "utacm_loc_city": "LSVL",
//   "utacm_loc_lot": "          ",
//   "utacm_loc_no": 1091,
//   "utacm_loc_no_suff": "     ",
//   "utacm_loc_post_dir": "    ",
//   "utacm_loc_pre_dir": "    ",
//   "utacm_loc_state": "CO",
//   "utacm_loc_str_typ": "CT        ",
//   "utacm_loc_street": "COPPER HILL              ",
//   "utacm_loc_subd": "                              ",
//   "utacm_loc_unit_typ": "          ",
//   "utacm_loc_zip": "80027     ",
//   "utacm_account_date": "2010-03-10T00:00:00.000Z",
//   "utacm_read_seq_d": 1500,
//   "utacm_route_book_d": "62    ",
//   "utacm_e911_no": 0,
//   "utacm_val_address": " ",
//   "utacm_floor_drain": "N",
//   "utacm_convert": "Y",
//   "utacm_filler": "                                                  ",
//   "utacm_line_type": "          ",
//   "utacm_material": "          ",
//   "utacm_sump_pump": "N",
//   "utacm_bkflow_req": "N",
//   "utacm_alt_parcel": "                              ",
//   "utacm_cplm_key": null
// }
// COUNT: 7207

// router.get('/accounts/master', function(req, res, next) {
//   getTop100("dbo.utactmst",res);
// });

// {
//   "a_account_key": 501,
//   "a_account": "462958800                     ",
//   "am_start_date": "2010-03-10T00:00:00.000Z",
//   "am_stop_date": "9999-12-31T00:00:00.000Z",
//   "am_account_type": "RE",
//   "am_parcel": "                              ",
//   "am_property_desc": "                                                                 ",
//   "am_district": "3 ",
//   "am_location_unit": "     ",
//   "am_location_city": "LSVL",
//   "am_location_lot": "          ",
//   "am_street_number": 1091,
//   "am_location_suffix": "     ",
//   "am_loc_post_dir": "    ",
//   "am_loc_pre_dir": "    ",
//   "am_loc_state": "CO",
//   "am_loc_street_type": "CT        ",
//   "am_location_street": "COPPER HILL              ",
//   "am_loc_subdivision": "                              ",
//   "am_loc_unit_type": "          ",
//   "am_loc_zip_code": "80027     ",
//   "am_acct_add_date": "2010-03-10T00:00:00.000Z",
//   "am_read_sequence": 1500,
//   "am_route_book": "62    ",
//   "am_911_address": 0,
//   "am_valid_address": " ",
//   "am_floor_drain": "N",
//   "am_converted_flag": "Y",
//   "am_filler": "                                                  ",
//   "am_line_type": "          ",
//   "am_material_used": "          ",
//   "am_sump_pump_flag": "N",
//   "am_bkflow_dev_req": "N",
//   "am_alt_parcel": "                              ",
//   "am_acct_key_link": "462958800           "
// }

// am_street_number, '749'
router.get('/ut_account_master/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  // if (field === "top100") return getTop100("dbo.ut_account_master",res);
  let query = `SELECT * FROM dbo.ut_account_master WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "a_acct_cust_key": 501,
//   "a_account": "462958800                     ",
//   "a_ar_customer_cid": 16469,
//   "a_account_key": 501,
//   "ac_addtl_address": 0,
//   "ac_start_date": "2010-03-10T00:00:00.000Z",
//   "ac_stop_date": "9999-12-31T00:00:00.000Z",
//   "ac_acct_relation": "O",
//   "ac_converted_flag": "Y",
//   "ac_filler": "                                                  ",
//   "ac_bill_hold_flag": "N",
//   "ac_prim_acct_cust": null,
//   "ac_prim_sec_flag": "N",
//   "ac_annual_status": "N",
//   "ac_elig_daily_use": "N",
//   "ac_last_bill_year": 0,
//   "ac_times_pd_late": 0,
//   "ac_phone_number": "                    ",
//   "ac_billable_flag": "Y",
//   "ac_bill_del_method": "P",
//   "ac_intern_bill_flg": "N",
//   "ar_related_seq": null,
//   "ar_acct_relation": null,
//   "ar_related_acct": null,
//   "ar_rel_acct_filler": null,
//   "cc_doc_sequence": null,
//   "cc_customer_cid": null,
//   "cc_cid_address": null,
//   "cc_doc_type": null,
//   "cc_from_month": null,
//   "cc_to_month": null,
//   "cc_comment": null,
//   "cc_copy_to_filler": null,
//   "sc_code": null,
//   "sc_category": null,
//   "sc_type": null,
//   "cd_code": "DELQ",
//   "cd_value": "O",
//   "xr_bal_xfr_flag": null,
//   "xr_dep_xfr_flag": null,
//   "xr_eft_xfr_flag": null,
//   "xr_xfr_to_acct_num": null,
//   "nc_deposit_type": null,
//   "nc_customer_cid": null,
//   "nc_effective_date": null,
//   "nc_valid_thru_date": null,
//   "nc_deposit_amt": null,
//   "nc_dep_identifier": null
// }

router.get('/ut_customers/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  let query = `SELECT * FROM dbo.ut_customers WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "a_customer": 1,
//   "cs_name1": "SILVERTREES WEST H.O.A.                 ",
//   "cs_the": "N",
//   "cs_name2": "                                        ",
//   "cs_address1": "728 FRONT ST                            ",
//   "cs_address2": "STE A                                   ",
//   "cs_city": "LOUISVILLE          ",
//   "cs_state": "CO",
//   "cs_zip": "80027-1801",
//   "cs_country": "USA            ",
//   "cs_nh_sw": "E",
//   "cs_phone": "720-583-4369        ",
//   "cs_fax": "                    ",
//   "cs_email": "invoices@foxpropertymgmt.com                                                                                                                                                                                                                                  ",
//   "cs_create_dept": "UB",
//   "cs_account_type": " ",
//   "cs_resident": " ",
//   "cs_updt_by": "munis               ",
//   "cs_updt_date": "2017-10-19T00:00:00.000Z",
//   "cs_updt_time": "10:02",
//   "cs_internet": "                                        ",
//   "cs_ssn": "           ",
//   "cs_convert": "Y",
//   "arcs_profile_id": 0,
//   "arcs_external_ref": "               ",
//   "arcs_vendor_num": 0,
//   "arcs_cust_type": "        ",
//   "arcs_geo_code": "        ",
//   "arcs_filler": "                 ",
//   "arcs_status": "A   ",
//   "arcs_confidential": "N",
//   "arcs_employee_num": 0,
//   "arcs_dept": "5364 ",
//   "arcs_pod": "  "
// }

router.get('/ub_customers/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  let query = `SELECT * FROM dbo.ub_customers WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "a_service_key": 512,
//   "bt_meter_stat_type": "C",
//   "bt_act_demand_use": 0,
//   "bt_act_kvar_usage": 0,
//   "bt_actual_read": 2709,
//   "bt_actual_usage": 78,
//   "bt_billed_dm_amt": 0,
//   "bt_billed_kvar_amt": 0,
//   "bt_billed_usage": 78,
//   "bt_dmd_multiplier": 1,
//   "bt_demand_factor": 1,
//   "bt_dummy_meter_flg": " ",
//   "bt_filler": "                                                  ",
//   "bt_meter_read": " ",
//   "bt_multi_meter": " ",
//   "bt_meter_read_date": "2017-09-20T00:00:00.000Z",
//   "bt_meter_read_time": "12:00:00",
//   "bt_reader_id": "    ",
//   "bt_usage_allowance": 0,
//   "bt_cons_factor": 1,
//   "bt_est_read_flag": " ",
//   "bt_prev_read_date": "2017-08-21T00:00:00.000Z",
//   "bt_transact_type": "    ",
//   "bt_serv_order_num": "          ",
//   "bt_previous_read": 2631,
//   "a_meter_det_key": 501,
//   "bt_account": "462958800                     ",
//   "bt_customer_number": 16469,
//   "bt_service_code": "1000  ",
//   "bt_service_seq": 1,
//   "bt_act_cons_usage": 78,
//   "bt_read_code": "A"
// }

router.get('/ut_consumption/:field/:value', function(req, res, next) {
  const field = req.params.field;
  const value = req.params.value;
  let query = `SELECT * FROM dbo.ut_consumption WHERE ${field} = ${value};`
  getQuery(query,res);
});

// {
//   "a_acct": 16469,
//   "a_bill_year": 2017,
//   "a_bill_number": 1,
//   "a_ar_cat": 60,
//   "bd_cat_link": "ar_cat    ",
//   "bd_line": 1,
//   "a_serv_code": "5100  ",
//   "bd_original_amount": 1.1,
//   "bd_adjust_amount": 0,
//   "bd_abate_amount": 0,
//   "bd_pmt_adjust": 0,
//   "bd_installment1": 1.1,
//   "bd_installment2": 0,
//   "bd_installment3": 0,
//   "bd_installment4": 0,
//   "bd_prelim_billed": 0,
//   "bd_prelim_adj": 0,
//   "bd_paid_amount": 0,
//   "bd_discount_amount": 0,
//   "bd_refund_amount": 0,
//   "bd_interest_paid": 0,
//   "bd_interest_held": 0,
//   "bd_writeoff": 0,
//   "bd_last_activity": null,
//   "bd_original_lien": " "
// }

router.get('/ub_bill_detail', function(req, res, next) {
  getTop100("dbo.ub_bill_detail",res);
});

// {
//   "a_service_code": "1000  ",
//   "ch_long_desc": "WT RESI INSIDE                ",
//   "ch_short_desc": "WT        ",
//   "rh_summary_code": "W"
// }

router.get('/ut_charges', function(req, res, next) {
  getTop100("dbo.ut_charges",res);
});

module.exports = router;

// 749 Main Street - Example Joins

// 2016 Usage - 145010051	749 Main ST	1	1	1239	6	6	7	7	6	7	6	7	7	7	6	7	79
// ut_account_master - City Hall
// {
//   "a_account_key": 6432,
     // ADG - Account Number
//   "a_account": "145010051                     ",
     // ADG - Location Code
//   "am_start_date": "1995-02-23T00:00:00.000Z",
//   "am_stop_date": "9999-12-31T00:00:00.000Z",
//   "am_account_type": "LV",
//   "am_parcel": "                              ",
//   "am_property_desc": "                                                                 ",
//   "am_district": "1 ",
//   "am_location_unit": "     ",
//   "am_location_city": "LSVL",
//   "am_location_lot": "          ",
//   "am_street_number": 749,
//   "am_location_suffix": "     ",
//   "am_loc_post_dir": "    ",
//   "am_loc_pre_dir": "    ",
//   "am_loc_state": "CO",
//   "am_loc_street_type": "ST        ",
//   "am_location_street": "MAIN                     ",
//   "am_loc_subdivision": "                              ",
//   "am_loc_unit_type": "          ",
//   "am_loc_zip_code": "80027     ",
//   "am_acct_add_date": "1995-02-23T00:00:00.000Z",
//   "am_read_sequence": 40,
//   "am_route_book": "45    ",
//   "am_911_address": 0,
//   "am_valid_address": " ",
//   "am_floor_drain": "N",
//   "am_converted_flag": "Y",
//   "am_filler": "                                                  ",
//   "am_line_type": "          ",
//   "am_material_used": "          ",
//   "am_sump_pump_flag": "N",
//   "am_bkflow_dev_req": "N",
//   "am_alt_parcel": "                              ",
//   "am_acct_key_link": "145010051           "
     // ADG - Location Code
// }

// ut_service_master - City Hall
// {
//   "a_service_mast_key": 34480,
//   "a_acct_cust_key": 6432,
//   "a_service_code": "1500  ",
//   "a_service_sequence": 1,
//   "sm_service_status": "A",
//   "sm_serv_start_date": "1995-02-23T00:00:00.000Z",
//   "sm_serv_stop_date": "9999-12-31T00:00:00.000Z",
//   "sm_gl_alloc_code": 0,
//   "sm_ar_category": 60,
//   "sm_number_periods": 0,
//   "sm_budget_bill_amt": 0,
//   "sm_budget_balance": 0,
//   "sm_bud_plan_flag": "N",
//   "sm_number_of_units": 0,
//   "sm_converted_flag": "Y",
//   "sm_serv_credit_amt": 0,
//   "sm_credit_status": "  ",
//   "sm_customer_type": "LV",
//   "sm_cycle_code": 12,
//   "sm_daily_base_use": 0,
//   "sm_discount_pct": 0,
//   "sm_factor_old": 0,
//   "sm_factor2": 0,
//   "sm_filler": "                                                  ",
//   "sm_final_bill_flag": "N",
//   "sm_last_commitment": "CN0002",
//   "sm_last_bill_run": "C1",
//   "sm_meter_flag": " ",
//   "sm_rate_adj_flag": "Y",
//   "sm_read_sequence": 40,
//   "sm_route_book": "45    ",
//   "sm_remain_seas_bal": 0,
//   "sm_seasonal_flag": "N",
//   "sm_service_type": "M",
//   "sm_final_status": " ",
//   "sm_status_type": " ",
//   "sm_service_id": "               ",
//   "sm_bill_rate_code": "WT15",
//   "sm_mult_factor": 1,
//   "sm_factor_type": "1",
//   "sm_multi_meter_mth": " ",
//   "sm_naics_sic_code": "      ",
//   "sm_sic_code_cat": "    ",
//   "sm_sic_type": "    ",
//   "sm_appl_status": "X",
//   "sm_full_concen_amt": 0,
//   "sn_note_sequence": null,
//   "sn_note_code": null,
//   "sn_note_type": null,
//   "sn_text1": null,
//   "sn_text2": null,
//   "sn_note_filler": null,
//   "sr_establish_time": 0,
//   "sr_filler": "                                                  ",
//   "sr_winter_qtr_stat": " ",
//   "sr_establish_meth": " ",
//   "sr_prev_usage_flag": " ",
//   "sr_prev_usage": 0,
//   "sr_curr_usage_flag": " ",
//   "sr_current_usage": 0,
//   "ss_ar_category": null,
//   "ss_serv_chg_seq": null,
//   "ss_subj_to_chg": null,
//   "ss_addl_chg_filler": null,
//   "sx_sales_tax_seq": null,
//   "sx_calc_order": null,
//   "sx_sales_tx_filler": null,
//   "sx_serv_code_taxed": null,
//   "sx_serv_seq_taxed": null,
//   "mm_secondary_acct": null,
//   "mm_sec_serv_code": null,
//   "mm_sec_serv_seq": null,
//   "mm_sec_filler": null,
//   "so_boo_serv_code": null,
//   "so_boo_num_periods": null,
//   "so_boo_ser_seq": null,
//   "so_boo_read_date": null,
//   "so_boo_filler": null,
//   "so_boo_usage_amt": null,
//   "st_number_of_bills": null,
//   "st_bills_remaining": null,
//   "st_bill_remain_flg": null,
//   "st_bill_percent": null,
//   "st_bill_credit": null,
//   "sf_flat_item_seq": null,
//   "a_flat_item_key": null,
//   "sf_flat_item_code": null,
//   "sf_flat_itm_filler": null,
//   "sf_flat_item_qty": null,
//   "sf_flat_item_size": null,
//   "sf_flat_item_start": null,
//   "sf_flat_itm_status": null,
//   "sf_flat_item_stop": null,
//   "sf_flat_item_type": null,
//   "sf_item_unit_cost": null,
//   "sf_unit_usage": null,
//   "sf_item_prev_read": null,
//   "sf_total_cost": null,
//   "sd_serv_meter_type": "C",
//   "sd_last_bill_read": 0,
//   "sd_bill_prev_read": 496,
//   "sd_dmd_multiplier": 0,
//   "sd_old_meter_dials": 0,
//   "sd_dmd_pwr_factor": 0,
//   "sd_serv_det_filler": "                                                  ",
//   "sd_num_prev_est": 0,
//   "sd_credit_percent": 0,
//   "sd_curr_read_date": null,
//   "sd_prev_read_date": "2017-08-25T00:00:00.000Z",
//   "sd_meter_remote_id": "27380659       ",
//   "sd_replace_usage": 0,
//   "a_meter_det_key": 6432,
//   "a_meter_det_key2": null,
//   "sd_comment": "                                        ",
//   "sm_pay_plan": " ",
//   "sr_winter_avg_date": null,
//   "sr_winter_avg_override": " ",
//   "sm_serv_key_link": "34480               "
// }

// ut_meters
// {
//   "a_meter_key": 6421,
//   "mt_manufact_code": "BAD ",
//   "mt_serial_number": "20260062       ",
//   "mt_inv_status": "U",
//   "mt_fixed_asset": "               ",
//   "mt_meter_condition": "    ",
//   "mt_converted_flag": "Y",
//   "mt_meter_cost": 0,
//   "mt_meter_filler": "                                                  ",
//   "mt_install_date": "1995-02-23T00:00:00.000Z",
//   "mt_next_cal_date": null,
//   "mt_purchased_date": null,
//   "mt_retired_date": null,
//   "mt_inv_return_date": null,
//   "mt_last_serv_date": null,
//   "mt_service_cat": "W",
//   "mt_compound_flag": " ",
//   "mt_inv_stock_num": "                    ",
//   "mc_sequence": null,
//   "mc_account": null,
//   "mc_removed_date": null,
//   "mc_final_read": null,
//   "mc_filler": null,
//   "mc_service_code": null,
//   "mc_service_seq": null,
//   "mc_connect_date": null,
//   "mc_first_read_date": null,
//   "mc_comment": null,
//   "a_meter_det_key": 6432,
     // ADG - Account Number
//   "md_sequence": 1,
//   "md_device_code": "R",
//   "md_num_dials_read": 5,
//   "md_conv_factor": 1,
//   "md_detail_filler": "                                                  ",
//   "md_num_fixed_zeros": 0,
//   "md_meter_size": "150       ",
//   "md_meter_type": "Y",
//   "md_met2_serial_num": "               ",
//   "md_met3_serial_num": "               ",
//   "md_meter_model": "          ",
//   "md_initial_reading": 0,
//   "md_test_circle_cd": "02",
//   "md_dev_flow_type": "N   ",
//   "md_demand_position": 0,
//   "md_demand_decimal": 0,
//   "md_reg_pressure": 0,
//   "md_attach_to_serv": "Y",
//   "md_rem_id_serial": "27380659       ",
//   "md_cast_id_number": "               ",
//   "md_addl_reference": "               ",
//   "ml_k_value": null,
//   "ml_reg_ratio_value": null,
//   "ml_meter_amperage": null,
//   "ml_phase_code": null,
//   "ml_meter_voltage": null,
//   "ml_wire_code": null,
//   "ml_elec_met_filler": null,
//   "me_equipment_seq": null,
//   "me_equip_status": null,
//   "me_equip_filler": null,
//   "me_addl_info": null,
//   "me_item_code": null,
//   "me_item_desc": null,
//   "me_equip_return_dt": null,
//   "mt_meter_key_link": "BAD  20260062       "
// }

// ut_consumption
// {
//   "a_service_key": 455701,
//   "bt_meter_stat_type": "C",
//   "bt_act_demand_use": 0,
//   "bt_act_kvar_usage": 0,
//   "bt_actual_read": 496,
//   "bt_actual_usage": 24,
//   "bt_billed_dm_amt": 0,
//   "bt_billed_kvar_amt": 0,
//   "bt_billed_usage": 24,
//   "bt_dmd_multiplier": 1,
//   "bt_demand_factor": 1,
//   "bt_dummy_meter_flg": " ",
//   "bt_filler": "                                                  ",
//   "bt_meter_read": " ",
//   "bt_multi_meter": " ",
//   "bt_meter_read_date": "2017-08-25T00:00:00.000Z",
//   "bt_meter_read_time": "12:00:00",
//   "bt_reader_id": "    ",
//   "bt_usage_allowance": 0,
//   "bt_cons_factor": 1,
//   "bt_est_read_flag": " ",
//   "bt_prev_read_date": "2017-07-24T00:00:00.000Z",
//   "bt_transact_type": "    ",
//   "bt_serv_order_num": "          ",
//   "bt_previous_read": 472,
//   "a_meter_det_key": 6432,
     // ADG - Account Number
//   "bt_account": "145010051                     ",
     // ADG - Location Code
//   "bt_customer_number": 1239,
     // LINK - ub_customers via a_customer
//   "bt_service_code": "1500  ",
//   "bt_service_seq": 1,
//   "bt_act_cons_usage": 24,
//   "bt_read_code": "A"
// }

// ut_customers
// {
//   "a_acct_cust_key": 6432,
//   "a_account": "145010051                     ",
//   "a_ar_customer_cid": 1239,
//   "a_account_key": 6432,
//   "ac_addtl_address": 0,
//   "ac_start_date": "1995-02-23T00:00:00.000Z",
//   "ac_stop_date": "9999-12-31T00:00:00.000Z",
//   "ac_acct_relation": "O",
//   "ac_converted_flag": "Y",
//   "ac_filler": "                                                  ",
//   "ac_bill_hold_flag": "N",
//   "ac_prim_acct_cust": null,
//   "ac_prim_sec_flag": "N",
//   "ac_annual_status": "N",
//   "ac_elig_daily_use": "N",
//   "ac_last_bill_year": 0,
//   "ac_times_pd_late": 0,
//   "ac_phone_number": "                    ",
//   "ac_billable_flag": "Y",
//   "ac_bill_del_method": "E",
//   "ac_intern_bill_flg": "N",
//   "ar_related_seq": null,
//   "ar_acct_relation": null,
//   "ar_related_acct": null,
//   "ar_rel_acct_filler": null,
//   "cc_doc_sequence": null,
//   "cc_customer_cid": null,
//   "cc_cid_address": null,
//   "cc_doc_type": null,
//   "cc_from_month": null,
//   "cc_to_month": null,
//   "cc_comment": null,
//   "cc_copy_to_filler": null,
//   "sc_code": null,
//   "sc_category": null,
//   "sc_type": null,
//   "cd_code": "DELQ",
//   "cd_value": "O",
//   "xr_bal_xfr_flag": null,
//   "xr_dep_xfr_flag": null,
//   "xr_eft_xfr_flag": null,
//   "xr_xfr_to_acct_num": null,
//   "nc_deposit_type": null,
//   "nc_customer_cid": null,
//   "nc_effective_date": null,
//   "nc_valid_thru_date": null,
//   "nc_deposit_amt": null,
//   "nc_dep_identifier": null
// }

// ub_customers
// {
//   "a_customer": 1239,
//   "cs_name1": "CITY OF LOUISVILLE                      ",
//   "cs_the": "N",
//   "cs_name2": "                                        ",
//   "cs_address1": "749 MAIN ST                             ",
//   "cs_address2": "                                        ",
//   "cs_city": "LOUISVILLE          ",
//   "cs_state": "CO",
//   "cs_zip": "80027-1829",
//   "cs_country": "USA            ",
//   "cs_nh_sw": "E",
//   "cs_phone": "                    ",
//   "cs_fax": "                    ",
//   "cs_email": "customerservice@louisvilleco.g                                                                                                                                                                                                                                ",
//   "cs_create_dept": "UB",
//   "cs_account_type": " ",
//   "cs_resident": " ",
//   "cs_updt_by": "munis               ",
//   "cs_updt_date": "2017-10-19T00:00:00.000Z",
//   "cs_updt_time": "10:02",
//   "cs_internet": "                                        ",
//   "cs_ssn": "           ",
//   "cs_convert": "Y",
//   "arcs_profile_id": 0,
//   "arcs_external_ref": "               ",
//   "arcs_vendor_num": 0,
//   "arcs_cust_type": "        ",
//   "arcs_geo_code": "        ",
//   "arcs_filler": "                 ",
//   "arcs_status": "A   ",
//   "arcs_confidential": "N",
//   "arcs_employee_num": 0,
//   "arcs_dept": "5364 ",
//   "arcs_pod": "  "
// }

// 2016 Usage - 145010000	749 1/4 Main ST	1	1	1238	0	0	0	1	10	26	26	29	26	25	0	0	143
// ut_account_master - City Hall Irrigation
// {
//   "a_account_key": 6433,
//   "a_account": "145010000                     ",
//   "am_start_date": "1993-08-13T00:00:00.000Z",
//   "am_stop_date": "9999-12-31T00:00:00.000Z",
//   "am_account_type": "LV",
//   "am_parcel": "                              ",
//   "am_property_desc": "                                                                 ",
//   "am_district": "1 ",
//   "am_location_unit": "     ",
//   "am_location_city": "LSVL",
//   "am_location_lot": "          ",
//   "am_street_number": 749,
//   "am_location_suffix": "1/4  ",
//   "am_loc_post_dir": "    ",
//   "am_loc_pre_dir": "    ",
//   "am_loc_state": "CO",
//   "am_loc_street_type": "ST        ",
//   "am_location_street": "MAIN                     ",
//   "am_loc_subdivision": "                              ",
//   "am_loc_unit_type": "          ",
//   "am_loc_zip_code": "80027     ",
//   "am_acct_add_date": "1993-08-13T00:00:00.000Z",
//   "am_read_sequence": 30,
//   "am_route_book": "45    ",
//   "am_911_address": 0,
//   "am_valid_address": " ",
//   "am_floor_drain": "N",
//   "am_converted_flag": "Y",
//   "am_filler": "                                                  ",
//   "am_line_type": "          ",
//   "am_material_used": "          ",
//   "am_sump_pump_flag": "N",
//   "am_bkflow_dev_req": "N",
//   "am_alt_parcel": "                              ",
//   "am_acct_key_link": "145010000           "
// }
