import React, { Fragment } from 'react';

import { Label, Input, FormGroup } from 'reactstrap';

const PumpManager = ({ handleChange, handleBlur, values }) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for='pumpMake' className='form-control-label'>
          Pump Make:
        </Label>
        <Input
          type='select'
          name='pumpMake'
          onChange={e => {
            handleChange('pumpMake')(e);
            handleChange('pumpModel')('');
          }}
          onBlur={handleBlur}
          value={values.pumpMake}
        >
          <option>Anthony</option>
          <option>Aqua-Flo</option>
          <option>Everbilt</option>
          <option>Harris</option>
          <option>Hayward</option>
          <option>Jacuzzi</option>
          <option>Jandy</option>
          <option>Pentair</option>
          <option>Polaris</option>
          <option>Premier</option>
          <option>Sta-Rite</option>
          <option>Water Wizard</option>
          <option>Waterway</option>
          <option>XtremepowerUS</option>
          <option>Other</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='pumpModel' className='form-control-label'>
          Pump Model:
        </Label>
        <Input
          type='select'
          name='pumpModel'
          value={values.pumpModel}
          onChange={handleChange}
        >
          {values.pumpMake === 'Anthony' && (
            <Fragment>
              <option>Choose One</option>
              <option>Bronze 1 1/2 HP</option>
              <option>Bronze 1 HP</option>
              <option>Bronze 2 HP</option>
              <option>Bronze 3/4 HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Aqua-Flo' && (
            <Fragment>
              <option>Choose One</option>
              <option>A Series Bronze 1 1/2 HP</option>
              <option>A Series Bronze 1 HP</option>
              <option>A Series Bronze 1/2 HP</option>
              <option>A Series Bronze 1/3 HP</option>
              <option>A Series Bronze 3 HP</option>
              <option>A Series Bronze 3/4 HP</option>
              <option>Dominator High Head 1 1/2 HP</option>
              <option>Dominator High Head 1 HP</option>
              <option>Dominator High Head 2 HP</option>
              <option>Dominator High Head 3/4 HP</option>
              <option>Dominator Medium Head 1 1/2 HP</option>
              <option>Dominator Medium Head 1 HP</option>
              <option>Dominator Medium Head 2 HP</option>
              <option>Dominator Medium Head 3/4 HP</option>
              <option>FMCP Series 1 1/2 HP</option>
              <option>FMCP Series 1 HP</option>
              <option>FMCP Series 1/2 HP</option>
              <option>FMCP Series 3/4 HP</option>
              <option>FMHP Series 1 1/2 HP</option>
              <option>FMHP Series 1 HP</option>
              <option>FMHP Series 1/2 HP</option>
              <option>FMHP Series 3/4 HP</option>
              <option>TMCP Series 1 1/2 HP</option>
              <option>TMCP Series 1 HP</option>
              <option>TMCP Series 1/2 HP</option>
              <option>TMCP Series 3/4 HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Everbilt' && (
            <Fragment>
              <option>Choose One</option>
              <option>
                1.5-HP 230/115-Volt In-Ground Pool Pump with Protector
                Technology
              </option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Harris' && (
            <Fragment>
              <option>Choose One</option>
              <option>ProForce 1.5HP</option>
              <option>ProForce 1HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Hayward' && (
            <Fragment>
              <option>Choose One</option>
              <option>Booster Model 6060 3/4 HP</option>
              <option>EcoStar SVRS SP3400</option>
              <option>EcoStar VS SP3400</option>
              <option>Max-Flo II SP2700X 1 1/2 HP</option>
              <option>Max-Flo II SP2700X 1 HP</option>
              <option>Max-Flo II SP2700X 2 HP</option>
              <option>Max-Flo II SP2700X 3/4 HP</option>
              <option>Max-Flo SP1800X 1 1/2 HP</option>
              <option>Max-Flo SP1800X 1 HP</option>
              <option>Max-Flo SP1800X 1/2 HP</option>
              <option>Max-Flo SP1800X 2 HP</option>
              <option>Max-Flo SP1800X 3/4 HP</option>
              <option>Max-Flo SP2800X 1 1/2 HP</option>
              <option>Max-Flo SP2800X 1 HP</option>
              <option>Max-Flo SP2800X 1/2 HP</option>
              <option>Max-Flo SP2800X 2 HP</option>
              <option>Max-Flo SP2800X 3/4 HP</option>
              <option>Max-Flo VS SP2300</option>
              <option>Max-Flo XL SP2300 1 1/2 HP</option>
              <option>Max-Flo XL SP2300 1 HP</option>
              <option>Max-Flo XL SP2300 2 HP</option>
              <option>Max-Flo XL SP2300 2 SPEED 1 1/2 HP</option>
              <option>Max-Flo XL SP2300 2 SPEED 1 HP</option>
              <option>Max-Flo XL SP2300 2 SPEED 2 HP</option>
              <option>Max-Flo XL SP2300 3/4 HP</option>
              <option>Max-Flo XL SP2300EE 3/4 HP</option>
              <option>Max-Flow SP2800B</option>
              <option>Northstar SP4000 1 1/2 HP</option>
              <option>Northstar SP4000 1 HP</option>
              <option>Northstar SP4000 1/2 HP</option>
              <option>Northstar SP4000 2 1/2 HP</option>
              <option>Northstar SP4000 2 HP</option>
              <option>Northstar SP4000 3 HP</option>
              <option>Northstar SP4000 3/4 HP</option>
              <option>Northstar SP4000X 1 1/2 HP</option>
              <option>Northstar SP4000X 1 HP</option>
              <option>Northstar SP4000X 2 1/2 HP</option>
              <option>Northstar SP4000X 2 HP</option>
              <option>Northstar SP4000X 3 HP</option>
              <option>Power-Flo II SP1700 1 HP</option>
              <option>Power-Flo II SP1700 1/2 HP</option>
              <option>Power-Flo II SP1700 3/4 HP</option>
              <option>Power-Flo III SP2600 1 1/2 HP</option>
              <option>Power-Flo III SP2600 1 HP</option>
              <option>Power-Flo LX SP1580 1 1/2 HP</option>
              <option>Power-Flo LX SP1580 1 HP</option>
              <option>Power-Flo LX SP1580 2 HP</option>
              <option>Power-Flo LX SP1580 3/4 HP</option>
              <option>Power-Flo Matrix SP1590 1 1/2 HP</option>
              <option>Power-Flo Matrix SP1590 1 HP</option>
              <option>Power-Flo Matrix SP1590 2 HP</option>
              <option>Power-Flo Matrix SP1590 3/4 HP</option>
              <option>Power-Flo SP1500 1 HP</option>
              <option>Power-Flo SP1500 1/2 HP</option>
              <option>Power-Flo SP1500 3/4 HP</option>
              <option>RS1000</option>
              <option>RS1500</option>
              <option>RS1502</option>
              <option>RS2000</option>
              <option>RS2002</option>
              <option>RS2500</option>
              <option>RS2502</option>
              <option>RS3000</option>
              <option>RS750</option>
              <option>Super II SP2600 1 1/2 HP</option>
              <option>Super II SP2600 1 HP</option>
              <option>Super II SP2600 1/2 HP</option>
              <option>Super II SP2600 3/4 HP</option>
              <option>Super II SP3000 1 1/2 HP</option>
              <option>Super II SP3000 1 HP</option>
              <option>Super II SP3000 1/2 HP</option>
              <option>Super II SP3000 2 1/2 HP</option>
              <option>Super II SP3000 2 HP</option>
              <option>Super II SP3000 3 HP</option>
              <option>Super II SP3000 3/4 HP</option>
              <option>Super II SP3000X 1 1/2 HP</option>
              <option>Super II SP3000X 1 HP</option>
              <option>Super II SP3000X 2 1/2 HP</option>
              <option>Super II SP3000X 2 HP</option>
              <option>Super II SP3000X 3 HP</option>
              <option>Super II SP3000X 3/4 HP</option>
              <option>Super Pump SP1600X 1 1/2 HP</option>
              <option>Super Pump SP1600X 1 HP</option>
              <option>Super Pump SP1600X 1/2 HP</option>
              <option>Super Pump SP1600X 2 HP</option>
              <option>Super Pump SP1600X 3/4 HP</option>
              <option>Super Pump SP2600 1 1/2 HP</option>
              <option>Super Pump SP2600 1 HP</option>
              <option>Super Pump SP2600 1/2 HP</option>
              <option>Super Pump SP2600 1/3 HP</option>
              <option>Super Pump SP2600 2 HP</option>
              <option>Super Pump SP2600 3/4 HP</option>
              <option>Super Pump SP2600X 1 1/2 HP</option>
              <option>Super Pump SP2600X 1 HP</option>
              <option>Super Pump SP2600X 1/2 HP</option>
              <option>Super Pump SP2600X 2 1/2 HP</option>
              <option>Super Pump SP2600X 2 HP</option>
              <option>Super Pump SP2600X 3/4 HP</option>
              <option>Super Pump VS SP2600</option>
              <option>TriStar SP3200 1 1/2 HP</option>
              <option>TriStar SP3200 1 HP</option>
              <option>TriStar SP3200 2 1/2 HP</option>
              <option>TriStar SP3200 2 HP</option>
              <option>TriStar SP3200 3 HP</option>
              <option>TriStar SP3200 3/4 HP</option>
              <option>TriStar SP3200EE 1 1/2 HP</option>
              <option>TriStar SP3200EE 1 HP</option>
              <option>TriStar SP3200EE 1/2 HP</option>
              <option>TriStar SP3200EE 2 HP</option>
              <option>TriStar SP3200EE 3 HP</option>
              <option>TriStar SP3200EE 3/4 HP</option>
              <option>TriStar SP3200EE 5 HP</option>
              <option>TriStar SP3600EE Waterfall 120 GPM</option>
              <option>TriStar SP3600EE Waterfall 75 GPM</option>
              <option>TriStar VS SP3200</option>
              <option>TriStar VS500</option>
              <option>TriStar VS900</option>
              <option>TriStar VS950</option>

              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Jacuzzi' && (
            <Fragment>
              <option>Choose One</option>
              <option>Cygnet 1 1/2 HP</option>
              <option>Cygnet 1 HP</option>
              <option>Cygnet 2 HP</option>
              <option>Cygnet 3/4 HP</option>
              <option>J-VSP150 Model 2 HP, Variable Speed</option>
              <option>L Model 1 1/2 HP</option>
              <option>L Model 1 HP</option>
              <option>L Model 1/2 HP</option>
              <option>L Model 3/4 HP</option>
              <option>LC Model 1 1/2 HP</option>
              <option>LC Model 1 HP</option>
              <option>LC Model 1/2 HP</option>
              <option>LC Model 3/4 HP</option>
              <option>LCM Model 1 1/2 HP</option>
              <option>LCM Model 1 HP</option>
              <option>LCM Model 1/2 HP</option>
              <option>LCM Model 3/4 HP</option>
              <option>LCU Model 1 1/2 HP</option>
              <option>LCU Model 1 HP</option>
              <option>LCU Model 1/2 HP</option>
              <option>LCU Model 3/4 HP</option>
              <option>LCUN2 Model 1 1/2 HP</option>
              <option>LCUN2 Model 1 HP</option>
              <option>LCUN2 Model 1/2 HP</option>
              <option>LCUN2 Model 3/4 HP</option>
              <option>LT Model 1 1/2 HP</option>
              <option>LT Model 1 HP</option>
              <option>LT Model 1/2 HP</option>
              <option>LT Model 3/4 HP</option>
              <option>LTC Model 1 1/2 HP</option>
              <option>LTC Model 1 HP</option>
              <option>LTC Model 1/2 HP</option>
              <option>LTC Model 3/4 HP</option>
              <option>LTCU Model 1 1/2 HP</option>
              <option>LTCU Model 1 HP</option>
              <option>LTCU Model 1/2 HP</option>
              <option>LTCU Model 3/4 HP</option>
              <option>LX Model 1 1/2 HP</option>
              <option>LX Model 1 HP</option>
              <option>LX Model 1/2 HP</option>
              <option>LX Model 3/4 HP</option>
              <option>Magnum 1 1/2 HP</option>
              <option>Magnum 1 HP</option>
              <option>Magnum 1/2 HP</option>
              <option>Magnum 2 HP</option>
              <option>Magnum 3 HP</option>
              <option>Magnum 3/4 HP</option>
              <option>Magnum Force 1 1/2 HP</option>
              <option>Magnum Force 1 HP</option>
              <option>Magnum Force 2 HP</option>
              <option>Magnum Force 3 HP</option>
              <option>Magnum Force 3/4 HP</option>
              <option>Magnum Plus 1 1/2 HP</option>
              <option>Magnum Plus 1 HP</option>
              <option>Magnum Plus 2 HP</option>
              <option>Magnum Plus 3 HP</option>
              <option>Magnum Plus 3/4 HP</option>
              <option>ULCU Model 1 1/2 HP</option>
              <option>ULCU Model 1 HP</option>
              <option>ULCU Model 1/2 HP</option>
              <option>ULCU Model 3/4 HP</option>
              <option>ULTCU Model 1 1/2 HP</option>
              <option>ULTCU Model 1 HP</option>
              <option>ULTCU Model 1/2 HP</option>
              <option>ULTCU Model 3/4 HP</option>

              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Jandy' && (
            <Fragment>
              <option>Choose One</option>
              <option>FHPM Flo-Pro 1 1/2 HP</option>
              <option>FHPM Flo-Pro 1 HP</option>
              <option>FHPM Flo-Pro 2 1/2 HP</option>
              <option>FHPM Flo-Pro 2 HP</option>
              <option>FHPM Flo-Pro 3/4 HP</option>
              <option>FHPM Flo-Pro VS 1 HP</option>
              <option>FHPM Flo-Pro VS 2 HP</option>
              <option>HHP 1 1/2 HP</option>
              <option>HHP 1 HP</option>
              <option>HHP 2 HP</option>
              <option>HHP 3 HP</option>
              <option>HHP 3/4 HP</option>
              <option>HHPU 1 1/2 HP</option>
              <option>HHPU 1 HP</option>
              <option>HHPU 2 1/2 HP</option>
              <option>HHPU 2 HP</option>
              <option>JEP E-Pump 1 1/2 HP</option>
              <option>JEP E-Pump 2 HP</option>
              <option>JEP E-Pump VS 1.5 HP</option>
              <option>JEP E-Pump VS 2 HP</option>
              <option>JHP 1 1/2 HP</option>
              <option>JHP 1 HP</option>
              <option>JHP 2 HP</option>
              <option>JHP 3 HP</option>
              <option>JHP 3/4 HP</option>
              <option>JHPU 1 1/2 HP</option>
              <option>JHPU 1 HP</option>
              <option>JHPU 2 1/2 HP</option>
              <option>JHPU 2 HP</option>
              <option>MHP 1 1/2 HP</option>
              <option>MHP 1 HP</option>
              <option>MHP 2 HP</option>
              <option>MHP 3/4 HP</option>
              <option>MHPM Max-HP 1 1/2 HP</option>
              <option>MHPM Max-HP 1 HP</option>
              <option>MHPM Max-HP 2 1/2 HP</option>
              <option>MHPM Max-HP 2 HP</option>
              <option>MHPM Max-HP 3/4 HP</option>
              <option>MHPU 1 1/2 HP</option>
              <option>MHPU 1 HP</option>
              <option>MHPU 2 1/2 HP</option>
              <option>MHPU 2 HP</option>
              <option>MHPU 3/4 HP</option>
              <option>PB4-60 Polaris Booster </option>
              <option>PB4-60Q Polaris Halcyon Booster</option>
              <option>PHP 1 1/2 HP</option>
              <option>PHP 1 HP</option>
              <option>PHP 2 HP</option>
              <option>PHP 3 HP</option>
              <option>PHP 3/4 HP</option>
              <option>PHPF Plus-HP 1 1/2 HP</option>
              <option>PHPF Plus-HP 1 HP</option>
              <option>PHPF Plus-HP 1/2 HP</option>
              <option>PHPF Plus-HP 2 HP</option>
              <option>PHPF Plus-HP 3/4 HP</option>
              <option>PHPF Plus-HP VS 2.7 HP</option>
              <option>PHPM Plus-HP 1 1/2 HP</option>
              <option>PHPM Plus-HP 1 HP</option>
              <option>PHPM Plus-HP 2 1/2 HP</option>
              <option>PHPM Plus-HP 2 HP</option>
              <option>PHPM Plus-HP 3/4 HP</option>
              <option>PHPM Plus-HP VS 2.7 HP</option>
              <option>PHPU 1 1/2 HP</option>
              <option>PHPU 1 HP</option>
              <option>PHPU 2 1/2 HP</option>
              <option>PHPU 2 HP</option>
              <option>Polaris PB4-SQ</option>
              <option>Pro Series Epump VSSHP270AUT</option>
              <option>SHPF Stealth 1 1/2 HP</option>
              <option>SHPF Stealth 1 HP</option>
              <option>SHPF Stealth 1/2 HP</option>
              <option>SHPF Stealth 2 HP</option>
              <option>SHPF Stealth 3 HP</option>
              <option>SHPF Stealth 3/4 HP</option>
              <option>SHPM Stealth 1 1/2 HP</option>
              <option>SHPM Stealth 1 HP</option>
              <option>SHPM Stealth 2 1/2 HP</option>
              <option>SHPM Stealth 2 HP</option>
              <option>SHPM Stealth 3 HP</option>
              <option>SHPM Stealth 3/4 HP</option>
              <option>VS FloPro 1.65 HP</option>
              <option>VS FloPro 1.85 HP Variable-Speed</option>
              <option>VS FloPro 2.7 HP</option>
              <option>WFTR Water Feature 1 1/2 HP</option>
              <option>WFTR Water Feature 1 HP</option>
              <option>WFTR Water Feature 2 1/2 HP</option>
              <option>WFTR Water Feature 2 HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Pentair' && (
            <Fragment>
              <option>Choose One</option>
              <option>ABG 1 1/2 HP</option>
              <option>ABG 1 HP</option>
              <option>ABG 1/2 HP</option>
              <option>ABG 2 HP</option>
              <option>ABG 3/4 HP</option>
              <option>Boost-Rite Booster</option>
              <option>C Series 10 HP</option>
              <option>C Series 15 HP</option>
              <option>C Series 20 HP</option>
              <option>C Series 5 HP</option>
              <option>C Series 7 1/2 HP</option>
              <option>CC/C Series Bronze 3 HP</option>
              <option>CC/C Series Bronze 5 HP</option>
              <option>Challenger High Flow 1 1/2 HP</option>
              <option>Challenger High Flow 1 HP</option>
              <option>Challenger High Flow 1/2 HP</option>
              <option>Challenger High Flow 2 1/2 HP</option>
              <option>Challenger High Flow 2 HP</option>
              <option>Challenger High Flow 3/4 HP</option>
              <option>Challenger High Pressure 1 1/2 HP</option>
              <option>Challenger High Pressure 1 HP</option>
              <option>Challenger High Pressure 1/2 HP</option>
              <option>Challenger High Pressure 2 1/2 HP</option>
              <option>Challenger High Pressure 2 HP</option>
              <option>Challenger High Pressure 3 HP</option>
              <option>Challenger High Pressure 3/4 HP</option>
              <option>CSP/CCSP Cast Iron 10 HP</option>
              <option>CSP/CCSP Cast Iron 15 HP</option>
              <option>CSP/CCSP Cast Iron 20 HP</option>
              <option>CSP/CCSP Cast Iron 7 1/2 HP</option>
              <option>Dura-Glas 1 1/2 HP</option>
              <option>Dura-Glas 1 HP</option>
              <option>Dura-Glas 1/2 HP</option>
              <option>Dura-Glas 1/3 HP</option>
              <option>Dura-Glas 2 1/2 HP</option>
              <option>Dura-Glas 2 HP</option>
              <option>Dura-Glas 3 HP</option>
              <option>Dura-Glas 3/4 HP</option>
              <option>Dura-Glas II 1 1/2 HP</option>
              <option>Dura-Glas II 1 HP</option>
              <option>Dura-Glas II 2 1/2 HP</option>
              <option>Dura-Glas II 2 HP</option>
              <option>Dura-Glas II 3 HP</option>
              <option>Dura-Glas II 3/4 HP</option>
              <option>Dura-Jet 1 1/2 HP</option>
              <option>Dura-Jet 1 HP</option>
              <option>Dura-Jet 1/2 HP</option>
              <option>Dura-Jet 1/3 HP</option>
              <option>Dura-Jet 2 1/2 HP</option>
              <option>Dura-Jet 2 HP</option>
              <option>Dura-Jet 3 HP</option>
              <option>Dura-Jet 3/4 HP</option>
              <option>Dyna-Glas 1 1/2 HP</option>
              <option>Dyna-Glas 1 HP</option>
              <option>Dyna-Glas 2 1/2 HP</option>
              <option>Dyna-Glas 2 HP</option>
              <option>Dyna-Glas 3/4 HP</option>
              <option>Dyna-Max 1 1/2 HP</option>
              <option>Dyna-Max 1 HP</option>
              <option>Dyna-Max 2 1/2 HP</option>
              <option>Dyna-Max 2 HP</option>
              <option>Dyna-Max 3/4 HP</option>
              <option>Dynamo 1 HP</option>
              <option>Dynamo 1/2 HP</option>
              <option>Dynamo 3/4 HP</option>
              <option>Dyna-Pro 1 1/2 HP</option>
              <option>Dyna-Pro 1 HP</option>
              <option>Dyna-Pro 1/2 HP</option>
              <option>Dyna-Pro 2 1/2 HP</option>
              <option>Dyna-Pro 2 HP</option>
              <option>Dyna-Pro 3/4 HP</option>
              <option>Dyna-Pro E 1 1/2 HP</option>
              <option>Dyna-Pro E 2 1/2 HP</option>
              <option>Dyna-Pro E 2 HP</option>
              <option>Dyne-Wave 1/3 HP</option>
              <option>EQ1000 10 HP</option>
              <option>EQ1500 15 HP</option>
              <option>EQ300 3 HP</option>
              <option>EQ500 5 HP</option>
              <option>EQ750 7 1/2 HP</option>
              <option>Hydro Pump 1 1/2 HP</option>
              <option>Hydro Pump 1 HP</option>
              <option>Hydro Pump 1/2 HP</option>
              <option>Hydro Pump 2 1/2 HP</option>
              <option>Hydro Pump 2 HP</option>
              <option>Hydro Pump 3 HP</option>
              <option>Hydro Pump 3/4 HP</option>
              <option>IntelliFlo 2 VST</option>
              <option>IntelliFlo i1</option>
              <option>IntelliFlo i2</option>
              <option>IntelliFlo VF</option>
              <option>IntelliFlo VS</option>
              <option>IntelliFlo VS+SVRS</option>
              <option>IntelliFlo VSF</option>
              <option>IntelliFlo XF</option>
              <option>IntelliFlo XF VSF</option>
              <option>IntelliPro VF</option>
              <option>IntelliPro VS</option>
              <option>IntelliPro VS+SVRS</option>
              <option>IntelliPro XF</option>
              <option>JWP 1 1/2 HP</option>
              <option>JWP 1 HP</option>
              <option>JWP 1/2 HP</option>
              <option>JWP 3/4 HP</option>
              <option>LA01N Booster</option>
              <option>LT Series 1/2 HP</option>
              <option>LT Series 1/8 HP</option>
              <option>LT Series 3/4 HP</option>
              <option>Max-E-Glas 1 1/2 HP</option>
              <option>Max-E-Glas 1 HP</option>
              <option>Max-E-Glas 1/2 HP</option>
              <option>Max-E-Glas 1/3 HP</option>
              <option>Max-E-Glas 2 1/2 HP</option>
              <option>Max-E-Glas 2 HP</option>
              <option>Max-E-Glas 3 HP</option>
              <option>Max-E-Glas 3/4 HP</option>
              <option>Max-E-Glas II 1 1/2 HP</option>
              <option>Max-E-Glas II 1 HP</option>
              <option>Max-E-Glas II 2 1/2 HP</option>
              <option>Max-E-Glas II 2 HP</option>
              <option>Max-E-Glas II 3 HP</option>
              <option>Max-E-Glas II 3/4 HP</option>
              <option>Max-E-Pro 1 1/2 HP</option>
              <option>Max-E-Pro 1 3/4 HP</option>
              <option>Max-E-Pro 1 HP</option>
              <option>Max-E-Pro 1/2 HP</option>
              <option>Max-E-Pro 2 1/2 HP</option>
              <option>Max-E-Pro 2 HP</option>
              <option>Max-E-Pro 3 HP</option>
              <option>Max-E-Pro 3/4 HP</option>
              <option>Max-E-Pro XF 2 1/2 HP</option>
              <option>Max-E-Pro XF 2 HP</option>
              <option>Max-E-Pro XF 3 HP</option>
              <option>Max-E-Pro XF 5 HP</option>
              <option>OptiFlo 1 1/2 HP</option>
              <option>OptiFlo 1 HP</option>
              <option>OptiFlo 3/4 HP</option>
              <option>Pinnacle 1 1/2 HP</option>
              <option>Pinnacle 1 HP</option>
              <option>Pinnacle 1/2 HP</option>
              <option>Pinnacle 2 HP</option>
              <option>Pinnacle 3/4 HP</option>
              <option>PLBC Booster</option>
              <option>SuperFlo 1 1/2 HP</option>
              <option>SuperFlo 1 HP</option>
              <option>SuperFlo 1/2 HP</option>
              <option>SuperFlo 2 1/2 HP</option>
              <option>SuperFlo 2 HP</option>
              <option>SuperFlo 3/4 HP</option>
              <option>SuperFlo VS</option>
              <option>SuperMax 1 1/2 HP</option>
              <option>SuperMax 1 HP</option>
              <option>SuperMax 1/2 HP</option>
              <option>SuperMax 2 1/2 HP</option>
              <option>SuperMax 2 HP</option>
              <option>SuperMax 3/4 HP</option>
              <option>SuperMax VS</option>
              <option>TEFC WhisperFlo XF</option>
              <option>Ultra-Flow 1 1/2 HP</option>
              <option>Ultra-Flow 1 HP</option>
              <option>Ultra-Flow 1/2 HP</option>
              <option>Ultra-Flow 2 1/2 HP</option>
              <option>Ultra-Flow 2 HP</option>
              <option>Ultra-Flow 3 HP</option>
              <option>Ultra-Flow 3/4 HP</option>
              <option>Waterfall 120 GPM</option>
              <option>Waterfall 150 GPM</option>
              <option>Waterfall 180 GPM</option>
              <option>Waterfall 75 GPM</option>
              <option>WhisperFlo 1 1/2 HP</option>
              <option>WhisperFlo 1 HP</option>
              <option>WhisperFlo 2 HP</option>
              <option>WhisperFlo 3 HP</option>
              <option>WhisperFlo 3/4 HP</option>
              <option>WhisperFlo Dual Speed 1 1/2 HP</option>
              <option>WhisperFlo Dual Speed 1 HP</option>
              <option>WhisperFlo Dual Speed 2 1/2 HP</option>
              <option>WhisperFlo Dual Speed 2 HP</option>
              <option>WhisperFlo Dual Speed 3/4 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 1 1/2 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 1 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 1/2 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 2 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 3 HP</option>
              <option>WhisperFlo Energy Efficient Full Rated 3/4 HP</option>
              <option>WhisperFlo High Performance 1 1/2 HP</option>
              <option>WhisperFlo High Performance 1 HP</option>
              <option>WhisperFlo High Performance 1/2 HP</option>
              <option>WhisperFlo High Performance 2 1/2 HP</option>
              <option>WhisperFlo High Performance 2 HP</option>
              <option>WhisperFlo High Performance 3 HP</option>
              <option>WhisperFlo High Performance 3/4 HP</option>
              <option>WhisperFlo Standard Full Rated 1 1/2 HP</option>
              <option>WhisperFlo Standard Full Rated 1 HP</option>
              <option>WhisperFlo Standard Full Rated 1/2 HP</option>
              <option>WhisperFlo Standard Full Rated 2 HP</option>
              <option>WhisperFlo Standard Full Rated 3 HP</option>
              <option>WhisperFlo Standard Full Rated 3/4 HP</option>
              <option>WhisperFlo TEFC Super-Duty 1 1/2 HP</option>
              <option>WhisperFlo TEFC Super-Duty 1 HP</option>
              <option>WhisperFlo TEFC Super-Duty 2 HP</option>
              <option>WhisperFlo TEFC Super-Duty 3 HP</option>
              <option>WhisperFlo Up Rated High Performance 1 1/2 HP</option>
              <option>WhisperFlo Up Rated High Performance 1 HP</option>
              <option>WhisperFlo Up Rated High Performance 2 1/2 HP</option>
              <option>WhisperFlo Up Rated High Performance 2 HP</option>
              <option>WhisperFlo Up Rated High Performance 3/4 HP</option>
              <option>WhisperFlo XF 2 1/2 HP</option>
              <option>WhisperFlo XF 2 HP</option>
              <option>WhisperFlo XF 3 HP</option>
              <option>WhisperFlo XF 5 HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Polaris' && (
            <Fragment>
              <option>Choose One</option>
              <option>PB4-60 3/4 HP Booster Pump</option>
              <option>PB4SQ Booster Pump</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Premier' && (
            <Fragment>
              <option>Choose One</option>
              <option>Model 555N</option>
              <option>Model 556N</option>
              <option>Model 575N</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Sta-Rite' && (
            <Fragment>
              <option>Choose One</option>
              <option>Max-E-Pro</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Water Wizard' && (
            <Fragment>
              <option>Choose One</option>
              <option>5-MSP 1200GPH 115V with 25' Cord</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'Waterway' && (
            <Fragment>
              <option>Choose One</option>
              <option>Iron Might 1/15HP 3410030-1E</option>
              <option>SMF-110 1HP</option>
              <option>SMF-115 1.5HP</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.pumpMake === 'XtremepowerUS' && (
            <Fragment>
              <option>Choose One</option>
              <option>2 Speed 1.5HP</option>
              <option>2 Speed 2HP</option>
              <option>2 Speed High-flo 2HP</option>
              <option>Variable Speed 2HP</option>
              <option>Other</option>
            </Fragment>
          )}
        </Input>
      </FormGroup>
    </Fragment>
  );
};

export default PumpManager;
