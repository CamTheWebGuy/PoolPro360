import React, { Fragment } from 'react';

import { Label, Input, FormGroup } from 'reactstrap';

const HeaterManager = ({ handleChange, handleBlur, values }) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for='heaterMake' className='form-control-label'>
          Heater Make:
        </Label>
        <Input
          type='select'
          name='heaterMake'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.heaterMake}
        >
          <option>AquaCal</option>
          <option>Built Right</option>
          <option>GulfStream</option>
          <option>Hayward</option>
          <option>Jandy</option>
          <option>Pentair</option>
          <option>Rheem / Raypak</option>
          <option>Other</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for='heaterModel' className='form-control-label'>
          Heater Model:
        </Label>
        <Input
          type='select'
          name='heaterModel'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.heaterModel}
        >
          {values.heaterMake === 'AquaCal' && (
            <Fragment>
              <option>Great Big Bopper BB500BRDSBNA Heat Pump</option>
              <option>Great Big Bopper BB500DRDSBNA Heat Pump</option>
              <option>Great Big Bopper BB500GRDSBNA Heat Pump</option>
              <option>HeatWave SuperQuiet SQ110R 1 Phase Heat Pump</option>
              <option>HeatWave SuperQuiet SQ120R 1 Phase 50Hz Heat Pump</option>
              <option>HeatWave SuperQuiet SQ120R 1 Phase 60Hz Heat Pump</option>
              <option>HeatWave SuperQuiet SQ120R 3 Phase Heat Pump</option>
              <option>HeatWave SuperQuiet SQ166R 1 Phase Heat Pump</option>
              <option>HeatWave SuperQuiet SQ166R 3 Phase Heat Pump</option>
              <option>HeatWave SuperQuiet SQ175 1 Phase Heat Pump</option>
              <option>HeatWave SuperQuiet SQ175 3 Phase Heat Pump</option>
              <option>SideWinder SW112 Heat Pump</option>
              <option>TropiCal T115 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T115 3 Phase Heat Pump</option>
              <option>TropiCal T135 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T135 3 Phase Heat Pump</option>
              <option>TropiCal T35 1 Phase 50Hz Heat Pump</option>
              <option>TropiCal T35 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T35 3 Phase Heat Pump</option>
              <option>TropiCal T55 1 Phase 50Hz Heat Pump</option>
              <option>TropiCal T55 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T55 3 Phase Heat Pump</option>
              <option>TropiCal T75 1 Phase 50Hz Heat Pump</option>
              <option>TropiCal T75 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T75 3 Phase Heat Pump</option>
              <option>TropiCal T90 1 Phase 60Hz Heat Pump</option>
              <option>TropiCal T90 3 Phase Heat Pump</option>
              <option>TropiCool TC1000 Water Chiller</option>
              <option>TropiCool TC500 Water Chiller</option>
              <option>Water Source WS03 1 Phase 60Hz Heat Pump</option>
              <option>Water Source WS05 1 Phase 60Hz Heat Pump</option>
              <option>Water Source WS05 3 Phase 50Hz Heat Pump</option>
              <option>Water Source WS05 3 Phase 60Hz Heat Pump</option>
              <option>Water Source WS10 1 Phase 60Hz Heat Pump</option>
              <option>Water Source WS10 3 Phase 60Hz Heat Pump</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Built Right' && (
            <Fragment>
              <option>115XW</option>
              <option>135XW</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Gulfstream' && (
            <Fragment>
              <option>HE110-R-A</option>
              <option>HE125-R-A</option>
              <option>HE125-R-B</option>
              <option>HE125-T-A</option>
              <option>HE125-T-B</option>
              <option>HE150-R-B</option>
              <option>HE150-T-A</option>
              <option>HE150-T-B</option>
              <option>HE90-R-A</option>
              <option>HI110-R-A</option>
              <option>HI125-R-A</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Hayward' && (
            <Fragment>
              <option>CPS1120 LP</option>
              <option>CPS1120 NG</option>
              <option>CPS1320 LP</option>
              <option>CPS1320 NG</option>
              <option>CPS1820 LP</option>
              <option>CPS1820 NG</option>
              <option>CPS520 LP</option>
              <option>CPS520 NG</option>
              <option>CPS720 LP</option>
              <option>CPS720 NG</option>
              <option>CPS920 LP</option>
              <option>CPS920 NG</option>
              <option>CPSE1120 LP</option>
              <option>CPSE1120 NG</option>
              <option>CPSE1320 LP</option>
              <option>CPSE1320 NG</option>
              <option>CPSE1820 LP</option>
              <option>CPSE1820 NG</option>
              <option>CPSE520 LP</option>
              <option>CPSE520 NG</option>
              <option>CPSE720 LP</option>
              <option>CPSE720 NG</option>
              <option>CPSE920 LP</option>
              <option>CPSE920 NG</option>
              <option>C-Spa XI 1.5 Electric</option>
              <option>C-Spa XI 11 Electric</option>
              <option>C-Spa XI 5.5 Electric</option>
              <option>CZ150 IID LP</option>
              <option>CZ150 IID NG</option>
              <option>CZ150 MV LP</option>
              <option>CZ150 MV NG</option>
              <option>CZ200 IID LP</option>
              <option>CZ200 IID NG</option>
              <option>CZ200 MV LP</option>
              <option>CZ200 MV NG</option>
              <option>CZ250 IID LP</option>
              <option>CZ250 IID NG</option>
              <option>CZ250 MV LP</option>
              <option>CZ250 MV NG</option>
              <option>CZ300 IID LP</option>
              <option>CZ300 IID NG</option>
              <option>CZ300 MV LP</option>
              <option>CZ300 MV NG</option>
              <option>CZ400 IID LP</option>
              <option>CZ400 IID NG</option>
              <option>CZ400 MV LP</option>
              <option>CZ400 MV NG</option>
              <option>H100ID1 Above Ground Induced Draft LP</option>
              <option>H100ID1 Above Ground Induced Draft NG</option>
              <option>H150ED1 LP</option>
              <option>H150ED1 NG</option>
              <option>H150ED2 LP</option>
              <option>H150ED2 NG</option>
              <option>H200ED1 LP</option>
              <option>H200ED1 NG</option>
              <option>H200ED2 LP</option>
              <option>H200ED2 NG</option>
              <option>H250 Low Nox LP</option>
              <option>H250 Low Nox NG</option>
              <option>H250ED1 LP</option>
              <option>H250ED1 NG</option>
              <option>H250ED2 LP</option>
              <option>H250ED2 NG</option>
              <option>H250ID1 Induced Draft LP</option>
              <option>H250ID1 Induced Draft NG</option>
              <option>H250IDL Low Nox Induced Draft LP</option>
              <option>H250IDL Low Nox Induced Draft NG</option>
              <option>H300ED1 LP</option>
              <option>H300ED1 NG</option>
              <option>H300ED2 LP</option>
              <option>H300ED2 NG</option>
              <option>H350 Low Nox LP</option>
              <option>H350 Low Nox NG</option>
              <option>H350ED1 LP</option>
              <option>H350ED1 NG</option>
              <option>H350ED2 LP</option>
              <option>H350ED2 NG</option>
              <option>H400 Low Nox LP</option>
              <option>H400 Low Nox NG</option>
              <option>H400ED1 LP</option>
              <option>H400ED1 NG</option>
              <option>H400ED2 LP</option>
              <option>H400ED2 NG</option>
              <option>H400ID1 Induced Draft LP</option>
              <option>H400ID1 Induced Draft NG</option>
              <option>H400IDL Low Nox Induced Draft LP</option>
              <option>H400IDL Low Nox Induced Draft NG</option>
              <option>H500FDN</option>
              <option>HeatMaster HM2-150 LP</option>
              <option>HeatMaster HM2-150 NG</option>
              <option>HeatMaster HM2-200 LP</option>
              <option>HeatMaster HM2-200 NG</option>
              <option>HeatMaster HM2-250 LP</option>
              <option>HeatMaster HM2-250 NG</option>
              <option>HeatMaster HM2-300 LP</option>
              <option>HeatMaster HM2-300 NG</option>
              <option>HeatMaster HM2-350 LP</option>
              <option>HeatMaster HM2-350 NG</option>
              <option>HeatMaster HM2-400 LP</option>
              <option>HeatMaster HM2-400 NG</option>
              <option>HeatPro H/C Heat Pump</option>
              <option>HeatPro HP1100 Heat Pump</option>
              <option>HeatPro HP11002 Heat Pump</option>
              <option>HeatPro HP2100 Heat Pump</option>
              <option>HeatPro HP21002 Heat Pump</option>
              <option>HeatPro HP21002C Heat Pump</option>
              <option>HeatPro HP2100TCO Heat Pump</option>
              <option>HeatPro HP2100TCO2 Heat Pump</option>
              <option>HeatPro HP3100 Heat Pump</option>
              <option>HeatPro HP380 Heat Pump</option>
              <option>HeatPro HP5 Heat Pump</option>
              <option>HeatPro HP600 Heat Pump</option>
              <option>HeatPro HP6002 Heat Pump</option>
              <option>HeatPro HPABG Heat Pump</option>
              <option>HeatPro HPABGDELUXE Heat Pump</option>
              <option>PSG II 110 LP</option>
              <option>PSG II 110 NG</option>
              <option>PSG II 180 LP</option>
              <option>PSG II 180 NG</option>
              <option>PSG II 215 LP</option>
              <option>PSG II 215 NG</option>
              <option>PSG II 255 LP</option>
              <option>PSG II 255 NG</option>
              <option>PSG II 355 LP</option>
              <option>PSG II 355 NG</option>
              <option>SG II 60 LP</option>
              <option>SG II 60 NG</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Jandy' && (
            <Fragment>
              <option>AE-Ti 2000 Heat Pump</option>
              <option>AE-Ti 2500 Heat Pump</option>
              <option>AE-Ti 3000 Heat Pump</option>
              <option>HI-E2 220 LP</option>
              <option>HI-E2 220 NG</option>
              <option>HI-E2 350 LP</option>
              <option>HI-E2 350 NG</option>
              <option>HI-E2 350NB NG</option>
              <option>HI-E2 350NC NG</option>
              <option>HI-E2 350NS NG</option>
              <option>HI-E2 350PB LP</option>
              <option>HI-E2 350PC LP</option>
              <option>HI-E2 350PS LP</option>
              <option>JE 1500T Heat Pump</option>
              <option>JE 2000T Heat Pump</option>
              <option>JE 2500T Heat Pump</option>
              <option>JE 2500T3 Heat Pump</option>
              <option>JE 3000T Heat Pump</option>
              <option>JE 3000T3 Heat Pump</option>
              <option>JE 3000TR Heat Pump</option>
              <option>JE 3000TR3 Heat Pump</option>
              <option>JXi 200 LP</option>
              <option>JXi 200 NG</option>
              <option>JXi 266 LP</option>
              <option>JXi 266 NG</option>
              <option>JXi 400 LP</option>
              <option>JXi 400 NG</option>
              <option>Legacy LRZE125 LP</option>
              <option>Legacy LRZE125 NG</option>
              <option>Legacy LRZE175 LP</option>
              <option>Legacy LRZE175 NG</option>
              <option>Legacy LRZE250 LP</option>
              <option>Legacy LRZE250 NG</option>
              <option>Legacy LRZE325 LP</option>
              <option>Legacy LRZE325 NG</option>
              <option>Legacy LRZE400 LP</option>
              <option>Legacy LRZE400 NG</option>
              <option>Legacy LRZM125 LP</option>
              <option>Legacy LRZM125 NG</option>
              <option>Legacy LRZM175 LP</option>
              <option>Legacy LRZM175 NG</option>
              <option>Legacy LRZM250 LP</option>
              <option>Legacy LRZM250 NG</option>
              <option>Legacy LRZM325 LP</option>
              <option>Legacy LRZM325 NG</option>
              <option>Legacy LRZM400 LP</option>
              <option>Legacy LRZM400 NG</option>
              <option>Lite LLD125 LP</option>
              <option>Lite LLD125 NG</option>
              <option>Lite LLD175 LP</option>
              <option>Lite LLD175 NG</option>
              <option>Lite LLD250 LP</option>
              <option>Lite LLD250 NG</option>
              <option>Lite LLD325 LP</option>
              <option>Lite LLD325 NG</option>
              <option>Lite LLD400 LP</option>
              <option>Lite LLD400 NG</option>
              <option>Lite LLG125 LP</option>
              <option>Lite LLG125 NG</option>
              <option>Lite LLG175 LP</option>
              <option>Lite LLG175 NG</option>
              <option>Lite LLG250 LP</option>
              <option>Lite LLG250 NG</option>
              <option>Lite LLG325 LP</option>
              <option>Lite LLG325 NG</option>
              <option>Lite LLG400 LP</option>
              <option>Lite LLG400 NG</option>
              <option>Lite2 LD125 LP</option>
              <option>Lite2 LD125 NG</option>
              <option>Lite2 LD175 LP</option>
              <option>Lite2 LD175 NG</option>
              <option>Lite2 LD250 LP</option>
              <option>Lite2 LD250 NG</option>
              <option>Lite2 LD325 LP</option>
              <option>Lite2 LD325 NG</option>
              <option>Lite2 LD400 LP</option>
              <option>Lite2 LD400 NG</option>
              <option>Lite2 LG125 LP</option>
              <option>Lite2 LG125 NG</option>
              <option>Lite2 LG175 LP</option>
              <option>Lite2 LG175 NG</option>
              <option>Lite2 LG250 LP</option>
              <option>Lite2 LG250 NG</option>
              <option>Lite2 LG325 LP</option>
              <option>Lite2 LG325 NG</option>
              <option>Lite2 LG400 LP</option>
              <option>Lite2 LG400 NG</option>
              <option>Lite2 LJ125 LP</option>
              <option>Lite2 LJ125 NG</option>
              <option>Lite2 LJ175 LP</option>
              <option>Lite2 LJ175 NG</option>
              <option>Lite2 LJ250 LP</option>
              <option>Lite2 LJ250 NG</option>
              <option>Lite2 LJ325 LP</option>
              <option>Lite2 LJ325 NG</option>
              <option>Lite2 LJ400 LP</option>
              <option>Lite2 LJ400 NG</option>
              <option>LT 250 Low Nox LP</option>
              <option>LT 250 Low Nox NG</option>
              <option>LT 250 LP</option>
              <option>LT 250 NG</option>
              <option>LT 400 Low Nox LP</option>
              <option>LT 400 Low Nox NG</option>
              <option>LT 400 LP</option>
              <option>LT 400 NG</option>
              <option>LX 250 Low Nox LP</option>
              <option>LX 250 Low Nox NG</option>
              <option>LX 250 LP</option>
              <option>LX 250 NG</option>
              <option>LX 400 Low Nox LP</option>
              <option>LX 400 Low Nox NG</option>
              <option>LX 400 LP</option>
              <option>LX 400 NG</option>
              <option>LXi 250 LP</option>
              <option>LXi 250 NG</option>
              <option>LXi 400 LP</option>
              <option>LXi 400 NG</option>
              <option>Series 1 EPC II 125 LP</option>
              <option>Series 1 EPC II 125 NG</option>
              <option>Series 1 EPC II 175 LP</option>
              <option>Series 1 EPC II 175 NG</option>
              <option>Series 1 EPC II 250 LP</option>
              <option>Series 1 EPC II 250 NG</option>
              <option>Series 1 EPC II 325 LP</option>
              <option>Series 1 EPC II 325 NG</option>
              <option>Series 1 EPC II 400 LP</option>
              <option>Series 1 EPC II 400 NG</option>
              <option>Series 1 EPC125 LP</option>
              <option>Series 1 EPC125 NG</option>
              <option>Series 1 EPC175 LP</option>
              <option>Series 1 EPC175 NG</option>
              <option>Series 1 EPC250 LP</option>
              <option>Series 1 EPC250 NG</option>
              <option>Series 1 EPC325 LP</option>
              <option>Series 1 EPC325 NG</option>
              <option>Series 1 EPC400 LP</option>
              <option>Series 1 EPC400 NG</option>
              <option>Series 1 EPG125 LP</option>
              <option>Series 1 EPG125 NG</option>
              <option>Series 1 EPG175 LP</option>
              <option>Series 1 EPG175 NG</option>
              <option>Series 1 EPG250 LP</option>
              <option>Series 1 EPG250 NG</option>
              <option>Series 1 EPG325 LP</option>
              <option>Series 1 EPG325 NG</option>
              <option>Series 1 EPG400 LP</option>
              <option>Series 1 EPG400 NG</option>
              <option>Series 1 EPM125 LP</option>
              <option>Series 1 EPM125 NG</option>
              <option>Series 1 EPM175 LP</option>
              <option>Series 1 EPM175 NG</option>
              <option>Series 1 EPM250 LP</option>
              <option>Series 1 EPM250 NG</option>
              <option>Series 1 EPM325 LP</option>
              <option>Series 1 EPM325 NG</option>
              <option>Series 1 EPM400 LP</option>
              <option>Series 1 EPM400 NG</option>
              <option>Series 1 EPS125 LP</option>
              <option>Series 1 EPS125 NG</option>
              <option>Series 1 EPS175 LP</option>
              <option>Series 1 EPS175 NG</option>
              <option>Series 1 EPS250 LP</option>
              <option>Series 1 EPS250 NG</option>
              <option>Series 1 EPS325 LP</option>
              <option>Series 1 EPS325 NG</option>
              <option>Series 1 EPS400 LP</option>
              <option>Series 1 EPS400 NG</option>
              <option>Series 2 ESC125 LP</option>
              <option>Series 2 ESC125 NG</option>
              <option>Series 2 ESC175 LP</option>
              <option>Series 2 ESC175 NG</option>
              <option>Series 2 ESC250 LP</option>
              <option>Series 2 ESC250 NG</option>
              <option>Series 2 ESC325 LP</option>
              <option>Series 2 ESC325 NG</option>
              <option>Series 2 ESC400 LP</option>
              <option>Series 2 ESC400 NG</option>
              <option>Series 2 ESG125 LP</option>
              <option>Series 2 ESG125 NG</option>
              <option>Series 2 ESG175 LP</option>
              <option>Series 2 ESG175 NG</option>
              <option>Series 2 ESG250 LP</option>
              <option>Series 2 ESG250 NG</option>
              <option>Series 2 ESG325 LP</option>
              <option>Series 2 ESG325 NG</option>
              <option>Series 2 ESG400 LP</option>
              <option>Series 2 ESG400 NG</option>
              <option>XL-3 Oil Fired</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Pentair' && (
            <Fragment>
              <option>ETi 400</option>
              <option>Mastertemp 175 LP</option>
              <option>Mastertemp 175 NG</option>
              <option>Mastertemp 200 LP</option>
              <option>Mastertemp 200 NG</option>
              <option>Mastertemp 250 LP</option>
              <option>Mastertemp 250 NG</option>
              <option>Mastertemp 300 LP</option>
              <option>Mastertemp 300 NG</option>
              <option>Mastertemp 400 LP</option>
              <option>Mastertemp 400 NG</option>
              <option>Max-E-Therm 200 LP</option>
              <option>Max-E-Therm 200 NG</option>
              <option>Max-E-Therm 333 LP</option>
              <option>Max-E-Therm 333 NG</option>
              <option>Max-E-Therm 400 LP</option>
              <option>Max-E-Therm 400 NG</option>
              <option>Max-E-Therm HD 200 LP</option>
              <option>Max-E-Therm HD 200 NG</option>
              <option>Max-E-Therm HD 333 LP</option>
              <option>Max-E-Therm HD 333 NG</option>
              <option>Max-E-Therm HD 400 LP</option>
              <option>Max-E-Therm HD 400 NG</option>
              <option>MiniMax 100 DSI LP</option>
              <option>MiniMax 100 DSI NG</option>
              <option>MiniMax 100 Millivolt LP</option>
              <option>MiniMax 100 Millivolt NG</option>
              <option>MiniMax 75 DSI LP</option>
              <option>MiniMax 75 DSI NG</option>
              <option>MiniMax 75 Millivolt LP</option>
              <option>MiniMax 75 Millivolt NG</option>
              <option>MiniMax CH 150 LP</option>
              <option>MiniMax CH 150 NG</option>
              <option>MiniMax CH 200 LP</option>
              <option>MiniMax CH 200 NG</option>
              <option>MiniMax CH 250 LP</option>
              <option>MiniMax CH 250 NG</option>
              <option>MiniMax CH 300 LP</option>
              <option>MiniMax CH 300 NG</option>
              <option>MiniMax CH 350 LP</option>
              <option>MiniMax CH 350 NG</option>
              <option>MiniMax CH 400 LP</option>
              <option>MiniMax CH 400 NG</option>
              <option>MiniMax NT 200 LP</option>
              <option>MiniMax NT 200 NG</option>
              <option>MiniMax NT 250 LP</option>
              <option>MiniMax NT 250 NG</option>
              <option>MiniMax NT 300 LP</option>
              <option>MiniMax NT 300 NG</option>
              <option>MiniMax NT 400 LP</option>
              <option>MiniMax NT 400 NG</option>
              <option>MiniMax Plus 1000 Heat Pump</option>
              <option>MiniMax Plus 1000R Heat Pump</option>
              <option>MiniMax Plus 400 Heat Pump</option>
              <option>MiniMax Plus 600 Heat Pump</option>
              <option>MiniMax Plus 800 Heat Pump</option>
              <option>MiniMax Plus CHILLR Heat Pump</option>
              <option>MiniMax Plus IID 150 LP</option>
              <option>MiniMax Plus IID 150 NG</option>
              <option>MiniMax Plus IID 200 LP</option>
              <option>MiniMax Plus IID 200 NG</option>
              <option>MiniMax Plus IID 250 LP</option>
              <option>MiniMax Plus IID 250 NG</option>
              <option>MiniMax Plus IID 300 LP</option>
              <option>MiniMax Plus IID 300 NG</option>
              <option>MiniMax Plus IID 350 LP</option>
              <option>MiniMax Plus IID 350 NG</option>
              <option>MiniMax Plus IID 400 LP</option>
              <option>MiniMax Plus IID 400 NG</option>
              <option>MiniMax Plus Millivolt 150 LP</option>
              <option>MiniMax Plus Millivolt 150 NG</option>
              <option>MiniMax Plus Millivolt 200 LP</option>
              <option>MiniMax Plus Millivolt 200 NG</option>
              <option>MiniMax Plus Millivolt 250 LP</option>
              <option>MiniMax Plus Millivolt 250 NG</option>
              <option>MiniMax Plus Millivolt 300 LP</option>
              <option>MiniMax Plus Millivolt 300 NG</option>
              <option>MiniMax Plus Millivolt 350 LP</option>
              <option>MiniMax Plus Millivolt 350 NG</option>
              <option>MiniMax Plus Millivolt 400 LP</option>
              <option>MiniMax Plus Millivolt 400 NG</option>
              <option>PowerMax 150 IID LP</option>
              <option>PowerMax 150 IID NG</option>
              <option>PowerMax 150 Millivolt LP</option>
              <option>PowerMax 150 Millivolt NG</option>
              <option>PowerMax 200 IID LP</option>
              <option>PowerMax 200 IID NG</option>
              <option>PowerMax 200 Millivolt LP</option>
              <option>PowerMax 200 Millivolt NG</option>
              <option>PowerMax 250 IID LP</option>
              <option>PowerMax 250 IID NG</option>
              <option>PowerMax 250 Millivolt LP</option>
              <option>PowerMax 250 Millivolt NG</option>
              <option>PowerMax 300 IID LP</option>
              <option>PowerMax 300 IID NG</option>
              <option>PowerMax 300 Millivolt LP</option>
              <option>PowerMax 300 Millivolt NG</option>
              <option>PowerMax 350 IID LP</option>
              <option>PowerMax 350 IID NG</option>
              <option>PowerMax 350 Millivolt LP</option>
              <option>PowerMax 350 Millivolt NG</option>
              <option>PowerMax 400 IID LP</option>
              <option>PowerMax 400 IID NG</option>
              <option>PowerMax 400 Millivolt LP</option>
              <option>PowerMax 400 Millivolt NG</option>
              <option>SR400HD</option>
              <option>ThermalFlo 1200 Heat Pump</option>
              <option>ThermalFlo 1200C Heat Pump</option>
              <option>ThermalFlo 1200R Heat Pump</option>
              <option>ThermalFlo 500 Heat Pump</option>
              <option>ThermalFlo 700 Heat Pump</option>
              <option>ThermalFlo 900 Heat Pump</option>
              <option>UltraTemp 110 Heat Pump</option>
              <option>UltraTemp 120 Heat Pump</option>
              <option>UltraTemp 120HC Heat Pump</option>
              <option>UltraTemp 140 Heat Pump</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.heaterMake === 'Rheem / Raypak' && (
            <Fragment>
              <option>E3T Digital Heater - 0005</option>
              <option>E3T Digital Heater - 0011</option>
              <option>E3T Digital Heater - 0018</option>
              <option>E3T Digital Heater – 0027</option>
              <option>ELS 1102-2 Electric</option>
              <option>ELS 552-2 Electric</option>
              <option>Model 053A IID LP</option>
              <option>Model 053A IID NG</option>
              <option>Model 053A Millivolt LP</option>
              <option>Model 053A Millivolt NG</option>
              <option>Model 055A IID LP</option>
              <option>Model 055A IID NG</option>
              <option>Model 055A Millivolt LP</option>
              <option>Model 055A Millivolt NG</option>
              <option>Model 055B IID LP</option>
              <option>Model 055B IID NG</option>
              <option>Model 055B Millivolt LP</option>
              <option>Model 055B Millivolt NG</option>
              <option>Model 104A IID Bronze LP</option>
              <option>Model 104A IID Bronze NG</option>
              <option>Model 104A IID Cast Iron LP</option>
              <option>Model 104A IID Cast Iron NG</option>
              <option>Model 104A Millivolt Bronze LP</option>
              <option>Model 104A Millivolt Bronze NG</option>
              <option>Model 104A Millivolt Cast Iron LP</option>
              <option>Model 104A Millivolt Cast Iron NG</option>
              <option>Model 153A IID LP</option>
              <option>Model 153A IID NG</option>
              <option>Model 153A Millivolt LP</option>
              <option>Model 153A Millivolt NG</option>
              <option>Model 155A IID Bronze LP</option>
              <option>Model 155A IID Bronze NG</option>
              <option>Model 155A IID Cast Iron LP</option>
              <option>Model 155A IID Cast Iron NG</option>
              <option>Model 155A Millivolt Bronze LP</option>
              <option>Model 155A Millivolt Bronze NG</option>
              <option>Model 155A Millivolt Cast Iron LP</option>
              <option>Model 155A Millivolt Cast Iron NG</option>
              <option>Model 183A IID Brass LP</option>
              <option>Model 183A IID Brass NG</option>
              <option>Model 183A IID Cast Iron LP</option>
              <option>Model 183A IID Cast Iron NG</option>
              <option>Model 183A Millivolt Brass LP</option>
              <option>Model 183A Millivolt Brass NG</option>
              <option>Model 183A Millivolt Cast Iron LP</option>
              <option>Model 183A Millivolt Cast Iron NG</option>
              <option>Model 263A IID Brass LP</option>
              <option>Model 263A IID Brass NG</option>
              <option>Model 263A IID Cast Iron LP</option>
              <option>Model 263A IID Cast Iron NG</option>
              <option>Model 263A Millivolt Brass LP</option>
              <option>Model 263A Millivolt Brass NG</option>
              <option>Model 263A Millivolt Cast Iron LP</option>
              <option>Model 263A Millivolt Cast Iron NG</option>
              <option>Model 333A IID Brass LP</option>
              <option>Model 333A IID Brass NG</option>
              <option>Model 333A IID Cast Iron LP</option>
              <option>Model 333A IID Cast Iron NG</option>
              <option>Model 333A Millivolt Brass LP</option>
              <option>Model 333A Millivolt Brass NG</option>
              <option>Model 333A Millivolt Cast Iron LP</option>
              <option>Model 333A Millivolt Cast Iron NG</option>
              <option>Model 403A IID Brass LP</option>
              <option>Model 403A IID Brass NG</option>
              <option>Model 403A IID Cast Iron LP</option>
              <option>Model 403A IID Cast Iron NG</option>
              <option>Model 403A Millivolt Brass LP</option>
              <option>Model 403A Millivolt Brass NG</option>
              <option>Model 403A Millivolt Cast Iron LP</option>
              <option>Model 403A Millivolt Cast Iron NG</option>
              <option>Model B-R259 LP</option>
              <option>Model B-R259 NG</option>
              <option>Model B-R268A LP</option>
              <option>Model B-R268A NG</option>
              <option>Model B-R408A LP</option>
              <option>Model B-R408A NG</option>
              <option>Model B-R409 LP</option>
              <option>Model B-R409 NG</option>
              <option>Model C-R206A Digital Copper LP</option>
              <option>Model C-R206A Digital Copper NG</option>
              <option>Model C-R206A Digital Cupro-Nickle LP</option>
              <option>Model C-R206A Digital Cupro-Nickle NG</option>
              <option>Model C-R206A Millivolt Copper LP</option>
              <option>Model C-R206A Millivolt Copper NG</option>
              <option>Model C-R206A Millivolt Cupro-Nickle LP</option>
              <option>Model C-R206A Millivolt Cupro-Nickle NG</option>
              <option>Model C-R207A Low Nox NG</option>
              <option>Model C-R266A Digital Copper LP</option>
              <option>Model C-R266A Digital Copper NG</option>
              <option>Model C-R266A Digital Cupro-Nickle LP</option>
              <option>Model C-R266A Digital Cupro-Nickle NG</option>
              <option>Model C-R266A Millivolt Copper LP</option>
              <option>Model C-R266A Millivolt Copper NG</option>
              <option>Model C-R266A Millivolt Cupro-Nickle LP</option>
              <option>Model C-R266A Millivolt Cupro-Nickle NG</option>
              <option>Model C-R267A Low Nox NG</option>
              <option>Model C-R336A Digital Copper LP</option>
              <option>Model C-R336A Digital Copper NG</option>
              <option>Model C-R336A Digital Cupro-Nickle LP</option>
              <option>Model C-R336A Digital Cupro-Nickle NG</option>
              <option>Model C-R336A Millivolt Copper LP</option>
              <option>Model C-R336A Millivolt Copper NG</option>
              <option>Model C-R336A Millivolt Cupro-Nickle LP</option>
              <option>Model C-R336A Millivolt Cupro-Nickle NG</option>
              <option>Model C-R337A Low Nox NG</option>
              <option>Model C-R406A Digital Copper LP</option>
              <option>Model C-R406A Digital Copper NG</option>
              <option>Model C-R406A Digital Cupro-Nickle LP</option>
              <option>Model C-R406A Digital Cupro-Nickle NG</option>
              <option>Model C-R406A Millivolt Copper LP</option>
              <option>Model C-R406A Millivolt Copper NG</option>
              <option>Model C-R406A Millivolt Cupro-Nickle LP</option>
              <option>Model C-R406A Millivolt Cupro-Nickle NG</option>
              <option>Model C-R407A Low Nox NG</option>
              <option>Model P-1005A LP</option>
              <option>Model P-1005A NG</option>
              <option>Model P-1104A LP</option>
              <option>Model P-1104A NG</option>
              <option>Model P-1125 LP</option>
              <option>Model P-1125 NG</option>
              <option>Model P-1223 LP</option>
              <option>Model P-1223 NG</option>
              <option>Model P-1262B LP</option>
              <option>Model P-1262B NG</option>
              <option>Model P-1336 LP</option>
              <option>Model P-1336 NG</option>
              <option>Model P-1468 LP</option>
              <option>Model P-1468 NG</option>
              <option>Model P-1504A LP</option>
              <option>Model P-1504A NG</option>
              <option>Model P-1505A LP</option>
              <option>Model P-1505A NG</option>
              <option>Model P-1532B LP</option>
              <option>Model P-1532B NG</option>
              <option>Model P-1631 LP</option>
              <option>Model P-1631 NG</option>
              <option>Model P-1802B LP</option>
              <option>Model P-1802B NG</option>
              <option>Model P-1826 LP</option>
              <option>Model P-1826 NG</option>
              <option>Model P-2002B NG</option>
              <option>Model P-2004A LP</option>
              <option>Model P-2004A NG</option>
              <option>Model P-2005A LP</option>
              <option>Model P-2005A NG</option>
              <option>Model P-2072B LP</option>
              <option>Model P-2072B NG</option>
              <option>Model P-2100 LP</option>
              <option>Model P-2100 NG</option>
              <option>Model P-2342B LP</option>
              <option>Model P-2342B NG</option>
              <option>Model P-2500 LP</option>
              <option>Model P-2500 NG</option>
              <option>Model P-3001 LP</option>
              <option>Model P-3001 NG</option>
              <option>Model P-302B LP</option>
              <option>Model P-302B NG</option>
              <option>Model P-3500 LP</option>
              <option>Model P-3500 NG</option>
              <option>Model P-4001 LP</option>
              <option>Model P-4001 NG</option>
              <option>Model P-402B LP</option>
              <option>Model P-402B NG</option>
              <option>Model P-502B LP</option>
              <option>Model P-502B NG</option>
              <option>Model P-504A LP</option>
              <option>Model P-504A NG</option>
              <option>Model P-514 LP</option>
              <option>Model P-514 NG</option>
              <option>Model P-624 LP</option>
              <option>Model P-624 NG</option>
              <option>Model P-652B LP</option>
              <option>Model P-652B NG</option>
              <option>Model P-724 LP</option>
              <option>Model P-724 NG</option>
              <option>Model P-752B LP</option>
              <option>Model P-752B NG</option>
              <option>Model P-754A LP</option>
              <option>Model P-754A NG</option>
              <option>Model P-824 LP</option>
              <option>Model P-824 NG</option>
              <option>Model P-902B LP</option>
              <option>Model P-902B NG</option>
              <option>Model P-962 LP</option>
              <option>Model P-962 NG</option>
              <option>Model P-992B LP</option>
              <option>Model P-992B NG</option>
              <option>Model P-M207 Digital Low Nox</option>
              <option>Model P-M267 Digital Low Nox</option>
              <option>Model P-M337 Digital Low Nox</option>
              <option>Model P-M406A-EN-C NG</option>
              <option>Model P-M407 Digital Low Nox</option>
              <option>Model P-R206A Digital Copper LP</option>
              <option>Model P-R206A Digital Copper NG</option>
              <option>Model P-R206A Digital Cupro-Nickle LP</option>
              <option>Model P-R206A Digital Cupro-Nickle NG</option>
              <option>Model P-R206A Millivolt Copper LP</option>
              <option>Model P-R206A Millivolt Copper NG</option>
              <option>Model P-R206A Millivolt Cupro-Nickle LP</option>
              <option>Model P-R206A Millivolt Cupro-Nickle NG</option>
              <option>Model P-R207A Low Nox NG</option>
              <option>Model P-R266A Digital Copper LP</option>
              <option>Model P-R266A Digital Copper NG</option>
              <option>Model P-R266A Digital Cupro-Nickle LP</option>
              <option>Model P-R266A Digital Cupro-Nickle NG</option>
              <option>Model P-R266A Millivolt Copper LP</option>
              <option>Model P-R266A Millivolt Copper NG</option>
              <option>Model P-R266A Millivolt Cupro-Nickle LP</option>
              <option>Model P-R266A Millivolt Cupro-Nickle NG</option>
              <option>Model P-R267A Low Nox NG</option>
              <option>Model P-R336A Digital Copper LP</option>
              <option>Model P-R336A Digital Copper NG</option>
              <option>Model P-R336A Digital Cupro-Nickle LP</option>
              <option>Model P-R336A Digital Cupro-Nickle NG</option>
              <option>Model P-R336A Millivolt Copper LP</option>
              <option>Model P-R336A Millivolt Copper NG</option>
              <option>Model P-R336A Millivolt Cupro-Nickle LP</option>
              <option>Model P-R336A Millivolt Cupro-Nickle NG</option>
              <option>Model P-R337A Low Nox NG</option>
              <option>Model P-R406A Digital Copper LP</option>
              <option>Model P-R406A Digital Copper NG</option>
              <option>Model P-R406A Digital Cupro-Nickle LP</option>
              <option>Model P-R406A Digital Cupro-Nickle NG</option>
              <option>Model P-R406A Millivolt Copper LP</option>
              <option>Model P-R406A Millivolt Copper NG</option>
              <option>Model P-R406A Millivolt Cupro-Nickle LP</option>
              <option>Model P-R406A Millivolt Cupro-Nickle NG</option>
              <option>Model P-R407A Low Nox NG</option>
              <option>Model PS10353ti 3 Phase Heat Pump</option>
              <option>Model PS10354ti 3 Phase Heat Pump</option>
              <option>Model PS10355ti 3 Phase Heat Pump</option>
              <option>Model R106A LP</option>
              <option>Model R106A NG</option>
              <option>Model R156A LP</option>
              <option>Model R156A NG</option>
              <option>Model R185 Digital IID LP</option>
              <option>Model R185 Digital IID NG</option>
              <option>Model R185 Digital Millivolt LP</option>
              <option>Model R185 Digital Millivolt NG</option>
              <option>Model R185 IID Brass LP</option>
              <option>Model R185 IID Brass NG</option>
              <option>Model R185 IID Cast Iron LP</option>
              <option>Model R185 IID Cast Iron NG</option>
              <option>Model R185 Millivolt Brass LP</option>
              <option>Model R185 Millivolt Brass NG</option>
              <option>Model R185 Millivolt Cast Iron LP</option>
              <option>Model R185 Millivolt Cast Iron NG</option>
              <option>Model R2350ti Heat Pump</option>
              <option>Model R265 Digital IID LP</option>
              <option>Model R265 Digital IID NG</option>
              <option>Model R265 Digital Millivolt LP</option>
              <option>Model R265 Digital Millivolt NG</option>
              <option>Model R265 IID Brass LP</option>
              <option>Model R265 IID Brass NG</option>
              <option>Model R265 IID Cast Iron LP</option>
              <option>Model R265 IID Cast Iron NG</option>
              <option>Model R265 Millivolt Brass LP</option>
              <option>Model R265 Millivolt Brass NG</option>
              <option>Model R265 Millivolt Cast Iron LP</option>
              <option>Model R265 Millivolt Cast Iron NG</option>
              <option>Model R335 Digital IID LP</option>
              <option>Model R335 Digital IID NG</option>
              <option>Model R335 Digital Millivolt LP</option>
              <option>Model R335 Digital Millivolt NG</option>
              <option>Model R335 IID Brass LP</option>
              <option>Model R335 IID Brass NG</option>
              <option>Model R335 IID Cast Iron LP</option>
              <option>Model R335 IID Cast Iron NG</option>
              <option>Model R335 Millivolt Brass LP</option>
              <option>Model R335 Millivolt Brass NG</option>
              <option>Model R335 Millivolt Cast Iron LP</option>
              <option>Model R335 Millivolt Cast Iron NG</option>
              <option>Model R3350ti Heat Pump</option>
              <option>Model R405 Digital IID LP</option>
              <option>Model R405 Digital IID NG</option>
              <option>Model R405 Digital Millivolt LP</option>
              <option>Model R405 Digital Millivolt NG</option>
              <option>Model R405 IID Brass LP</option>
              <option>Model R405 IID Brass NG</option>
              <option>Model R405 IID Cast Iron LP</option>
              <option>Model R405 IID Cast Iron NG</option>
              <option>Model R405 Millivolt Brass LP</option>
              <option>Model R405 Millivolt Brass NG</option>
              <option>Model R405 Millivolt Cast Iron LP</option>
              <option>Model R405 Millivolt Cast Iron NG</option>
              <option>Model R4350ti Heat Pump</option>
              <option>Model R5350ti Heat Pump</option>
              <option>Model R6350ti Heat Pump</option>
              <option>Model R6350ti-E-HC Heat Pump</option>
              <option>Model R6350ti-E-PD Heat Pump</option>
              <option>Model R6353ti-E 3 Phase Heat Pump</option>
              <option>Model R6353ti-E-HC 3 Phase Heat Pump</option>
              <option>Model R8350ti Heat Pump</option>
              <option>Model R8350ti-E-HC Heat Pump</option>
              <option>Model R8353ti-E 3 Phase Heat Pump</option>
              <option>Model R8353ti-E-HE 3 Phase Heat Pump</option>
              <option>Model R8354ti-A 3 Phase Heat Pump</option>
              <option>Model RS5350ti-E-QT Heat Pump</option>
              <option>Model RS6350ti-E-QT Heat Pump</option>
              <option>Model RS8350ti-E-QT Heat Pump</option>
              <option>Model S-R410 LP</option>
              <option>Model S-R410 NG</option>
              <option>RHP 072 1 Phase Heat Pump</option>
              <option>RHP 072 3 Phase Heat Pump</option>
              <option>RHP 100 Heat Pump</option>
              <option>RHP 104 1 Phase Heat Pump</option>
              <option>RHP 104 3 Phase Heat Pump</option>
              <option>RHP 115 Heat Pump</option>
              <option>RHP 160 Heat Pump</option>

              <option>Other</option>
            </Fragment>
          )}
        </Input>
      </FormGroup>
    </Fragment>
  );
};

export default HeaterManager;
