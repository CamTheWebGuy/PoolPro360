import React, { Fragment } from 'react';

import { Label, Input, FormGroup } from 'reactstrap';

const FilterManager = ({ handleChange, handleBlur, values }) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for='filterMake' className='form-control-label'>
          Filter Make:
        </Label>
        <Input
          type='select'
          name='filterMake'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.filterMake}
        >
          <option>Anthony</option>
          <option>Baker Hydro</option>
          <option>Harmsco</option>
          <option>Hayward</option>
          <option>Jacuzzi</option>
          <option>Jandy</option>
          <option>Pac-Fab</option>
          <option>Pentair</option>
          <option>Unicel</option>
          <option>Waterway</option>
          <option>Other</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for='filterModel' className='form-control-label'>
          Filter Model:
        </Label>
        <Input
          type='select'
          name='filterModel'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.filterModel}
        >
          {values.filterMake === 'Anthony' && (
            <Fragment>
              <option>Apollo VA-26 DE</option>
              <option>Apollo VA-38 DE</option>
              <option>Apollo VA-52 1.5" DE</option>
              <option>Apollo VA-52 2" DE</option>
              <option>Flowmaster 4000 DE</option>
              <option>Flowmaster 5000 DE</option>
            </Fragment>
          )}

          {values.filterMake === 'Baker Hydro' && (
            <Fragment>
              <option>Baker II 3.14sq Sand</option>
              <option>Baker II 4.91sq Sand</option>
              <option>Hydro Mite 100 Cart</option>
              <option>Hydro Mite 25 Cart</option>
              <option>Hydro Mite 50 Cart</option>
              <option>Hydro Mite 75 Cart</option>
              <option>Ultra Mite 100 Cart</option>
              <option>Ultra Mite 150 Cart</option>
              <option>Ultra Mite 35 Cart</option>
              <option>Ultra Mite 50 Cart</option>
              <option>Ultra Mite 75 Cart</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Harmsco' && (
            <Fragment>
              <option>BF 105 Single Cart</option>
              <option>BF 1200FL</option>
              <option>BF 126 Cluster Style</option>
              <option>BF 144 Cluster Style</option>
              <option>BF 155 Single Cart</option>
              <option>BF 168</option>
              <option>BF 252</option>
              <option>BF 336</option>
              <option>BF 42 Cluster Style</option>
              <option>BF 450</option>
              <option>BF 55 Single Cart</option>
              <option>BF 600</option>
              <option>BF 84 Cluster Style</option>
              <option>BF 900FL</option>
              <option>BF 96 Cluster Style</option>
              <option>TF 100</option>
              <option>TF 150</option>
              <option>TF 50</option>
              <option>TF 75</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Hayward' && (
            <Fragment>
              <option>ASL C1250 Cartridge</option>
              <option>ASL C850 Cartridge</option>
              <option>Easy Clear C400 Cartridge</option>
              <option>Easy Clear C550 Cartridge</option>
              <option>Micro-Clear 24 DE</option>
              <option>Micro-Clear 36 DE</option>
              <option>Micro-Clear 48 DE</option>
              <option>Micro-Clear 60 DE</option>
              <option>Micro-Star Clear Cartridge</option>
              <option>Perflex EC30 DE</option>
              <option>Perflex EC40 DE</option>
              <option>Perflex EC40-AC DE</option>
              <option>Perflex EC50-A DE</option>
              <option>Perflex EC50-AC DE</option>
              <option>Perflex EC65 DE</option>
              <option>Perflex EC65-A DE</option>
              <option>Perflex EC75 DE</option>
              <option>Perflex EC75-A DE</option>
              <option>Pro Series Plus S311SX Sand</option>
              <option>Pro Series Plus S311SXV Sand</option>
              <option>Pro Series Plus S360SX Sand</option>
              <option>Pro Series S140T Sand</option>
              <option>Pro Series S144T Sand</option>
              <option>Pro Series S164T Sand</option>
              <option>Pro Series S166T Sand</option>
              <option>Pro Series S180T Sand</option>
              <option>Pro Series S210S Sand</option>
              <option>Pro Series S210T Sand</option>
              <option>Pro Series S220T Sand</option>
              <option>Pro Series S230T Sand</option>
              <option>Pro Series S244S Sand</option>
              <option>Pro Series S244T Sand</option>
              <option>Pro Series S270T Sand</option>
              <option>Pro Series S270T2 Sand</option>
              <option>Pro Series S310S Sand</option>
              <option>Pro Series S310T2 Sand</option>
              <option>Pro Series S360T2 Sand</option>
              <option>Pro-Grid 24 DE</option>
              <option>Pro-Grid 36 DE</option>
              <option>Pro-Grid 48 DE</option>
              <option>Pro-Grid 60 DE</option>
              <option>Pro-Grid 72 DE</option>
              <option>Regenx RG450 DE</option>
              <option>Regenx RG700 DE</option>
              <option>Regenx SC700 DE</option>
              <option>S160T Sand</option>
              <option>S190T Sand</option>
              <option>S200 Sand</option>
              <option>S240 Sand</option>
              <option>S245T Sand</option>
              <option>Star-Clear C1000 Cartridge</option>
              <option>Star-Clear C250 Cartridge</option>
              <option>Star-Clear C500 Cartridge</option>
              <option>Star-Clear C750 Cartridge</option>
              <option>Star-Clear II C1100 Cartridge</option>
              <option>Star-Clear II C1500 Cartridge</option>
              <option>Star-Clear II C800 Cartridge</option>
              <option>Star-Clear Plus C1200 Cartridge</option>
              <option>Star-Clear Plus C1750 Cartridge</option>
              <option>Star-Clear Plus C1900 Cartridge</option>
              <option>Star-Clear Plus C751 Cartridge</option>
              <option>Star-Clear Plus C900 Cartridge</option>
              <option>Super Star-Clear C2000 Cartridge</option>
              <option>Super Star-Clear C3000/C3025 Cartridge</option>
              <option>Super Star-Clear C4000/C4025 Cartridge</option>
              <option>Super Star-Clear C4500 Cartridge</option>
              <option>Super Star-Clear C5000 Cartridge</option>
              <option>Super Star-Clear C5500 Cartridge</option>
              <option>Swim Clear C100S</option>
              <option>Swim Clear C150S</option>
              <option>Swim Clear C200S Cartridge</option>
              <option>Swim Clear C2020/C2025 Cartridge</option>
              <option>Swim Clear C2030 Cartridge</option>
              <option>Swim Clear C3020/C3025 Cartridge</option>
              <option>Swim Clear C3030 Cartridge</option>
              <option>Swim Clear C4020/C4025 Cartridge</option>
              <option>Swim Clear C4030 Cartridge</option>
              <option>Swim Clear C4500 Cartridge</option>
              <option>Swim Clear C5020/C5025 Cartridge</option>
              <option>Swim Clear C5030 Cartridge</option>
              <option>Swim Clear C5520 Cartridge</option>
              <option>Swim Clear C7030 Cartridge</option>
              <option>Swim Clear DE-4520 Cartridge</option>
              <option>XStream CC1000 Cartridge</option>
              <option>XStream CC1500 Cartridge</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Jacuzzi' && (
            <Fragment>
              <option>CFR 100 Cartridge</option>
              <option>CFR 150 Cartridge</option>
              <option>CFR 50 Cartridge</option>
              <option>CFR 75 Cartridge</option>
              <option>J-CQ420 420 SF</option>
              <option>Landslide LS40 DE</option>
              <option>Landslide LS55 DE</option>
              <option>Landslide LS70 DE</option>
              <option>Laser 160L Sand</option>
              <option>Laser 190L Sand</option>
              <option>Laser 225L Sand</option>
              <option>Laser 250L Sand</option>
              <option>Sher 120 Cartridge</option>
              <option>Sher 160 Cartridge</option>
              <option>Sher 200 Cartridge</option>
              <option>Sher 80 Cartridge</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Jandy' && (
            <Fragment>
              <option>2888 Energy Filter with Gauge</option>
              <option>C 200 Cartridge</option>
              <option>C 300 Cartridge</option>
              <option>C 400 Cartridge</option>
              <option>CJ 200 Cartridge</option>
              <option>CJ 250 Cartridge</option>
              <option>CL 340 Cartridge</option>
              <option>CL 460 Cartridge</option>
              <option>CL 580 Cartridge</option>
              <option>CS 100 Cartridge</option>
              <option>CS 150 Cartridge</option>
              <option>CS 200 Cartridge</option>
              <option>CS 250 Cartridge</option>
              <option>CT 100 Cartridge</option>
              <option>CT 50 Cartridge</option>
              <option>CT 75 Cartridge</option>
              <option>CV 340 Cartridge</option>
              <option>CV 460 Cartridge</option>
              <option>CV 580 Cartridge</option>
              <option>DEL 48 DE</option>
              <option>DEL 60 DE</option>
              <option>DEV 48 DE</option>
              <option>DEV 60 DE</option>
              <option>Pro Series Sand Filter JS100-SM</option>
              <option>ST 18T Sand</option>
              <option>ST 20T Sand</option>
              <option>ST 24T Sand</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Pac-Fab' && (
            <Fragment>
              <option>Mitra MA160 Cartridge</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Pentair' && (
            <Fragment>
              <option>CFW 120 Cartridge</option>
              <option>CFW 180 Cartridge</option>
              <option>CFW 315 Cartridge</option>
              <option>CFW 405 Cartridge</option>
              <option>CFW 560 Cartridge</option>
              <option>Clean &amp; Clear 100 Cartridge</option>
              <option>Clean &amp; Clear 150 Cartridge</option>
              <option>Clean &amp; Clear 150 Complete Filter</option>
              <option>Clean &amp; Clear 200 Cartridge</option>
              <option>Clean &amp; Clear 200 Complete Filter</option>
              <option>Clean &amp; Clear 50 Cartridge</option>
              <option>Clean &amp; Clear 75 Cartridge</option>
              <option>Clean &amp; Clear Plus 240 Cartridge</option>
              <option>Clean &amp; Clear Plus 320 Cartridge</option>
              <option>Clean &amp; Clear Plus 360 Cartridge</option>
              <option>Clean &amp; Clear Plus 420 Cartridge</option>
              <option>Clean &amp; Clear Plus 500 Cartridge</option>
              <option>Clean &amp; Clear Plus 520 Cartridge</option>
              <option>Commander 100 Cartridge</option>
              <option>Commander 25 Cartridge</option>
              <option>Commander 35 Cartridge</option>
              <option>Commander 50 Cartridge</option>
              <option>Commander 75 Cartridge</option>
              <option>Crystal-Flo II 16" Sand</option>
              <option>Crystal-Flo II 19" Sand</option>
              <option>Crystal-Flo II 22" Sand</option>
              <option>Crystal-Flo II 24" Sand</option>
              <option>Crystal-Flo II 26" Sand</option>
              <option>Crystal-Flo T-150BP Sand</option>
              <option>Crystal-Flo T-170BP Sand</option>
              <option>Crystal-Flo T-200BP Sand</option>
              <option>Crystal-Flo T-240BP Sand</option>
              <option>Crystal-Flo T-300BP Sand</option>
              <option>DEP 36 DE</option>
              <option>DEP 51 DE</option>
              <option>DEP 83 DE</option>
              <option>DEPB 36 DE</option>
              <option>DEPB 51 DE</option>
              <option>DEPB 83 DE</option>
              <option>Dynamic Series 1 Model RDC 25 Cartridge</option>
              <option>Dynamic Series 1 Model RDC 50 Cartridge</option>
              <option>Dynamic Series 2 Model RTL/RCF 100 Cartridge</option>
              <option>Dynamic Series 2 Model RTL/RCF 25 Cartridge</option>
              <option>Dynamic Series 2 Model RTL/RCF 50 Cartridge</option>
              <option>Dynamic Series 2 Model RTL/RCF 75 Cartridge</option>
              <option>Dynamic Series 3 Model RTL/RCF 100 Cartridge</option>
              <option>Dynamic Series 3 Model RTL/RCF 25 Cartridge</option>
              <option>Dynamic Series 3 Model RTL/RCF 50 Cartridge</option>
              <option>Dynamic Series 3 Model RTL/RCF 75 Cartridge</option>
              <option>EasyClean EC90 DE Inground Filter</option>
              <option>Eclipse 22" Sand</option>
              <option>Eclipse 26" Sand</option>
              <option>Eclipse 30" Sand</option>
              <option>Eclipse 36" Sand</option>
              <option>FNS 24 DE</option>
              <option>FNS 36 DE</option>
              <option>FNS 48 DE</option>
              <option>FNS 60 DE</option>
              <option>FNS Plus 24 DE</option>
              <option>FNS Plus 36 DE</option>
              <option>FNS Plus 48 DE</option>
              <option>FNS Plus 60 DE</option>
              <option>HRPB 20 Sand</option>
              <option>HRPB 24 Sand</option>
              <option>HRPB 30 Sand</option>
              <option>Meteor 18" Sand</option>
              <option>Meteor 20" Sand</option>
              <option>Meteor 22" Sand</option>
              <option>Meteor 26" Sand</option>
              <option>Meteor 30" Sand</option>
              <option>Nautilus 24 DE</option>
              <option>Nautilus 36 DE</option>
              <option>Nautilus 48 DE</option>
              <option>Nautilus 60 DE</option>
              <option>Nautilus 72 DE</option>
              <option>Nautilus Plus 24 DE</option>
              <option>Nautilus Plus 36 DE</option>
              <option>Nautilus Plus 48 DE</option>
              <option>Nautilus Plus 60 DE</option>
              <option>Nautilus Plus 72 DE</option>
              <option>Posi-Clear PXC 125 Cartridge</option>
              <option>Posi-Clear PXC 150 Cartridge</option>
              <option>Posi-Clear PXC 200 Cartridge</option>
              <option>Posi-Clear PXC 75 Cartridge</option>
              <option>Posi-Clear PXC 95 Cartridge</option>
              <option>Posi-Flo II PTM 100 Cartridge</option>
              <option>Posi-Flo II PTM 135 Cartridge</option>
              <option>Posi-Flo II PTM 50 Cartridge</option>
              <option>Posi-Flo II PTM 70 Cartridge</option>
              <option>Predator 100 Cartridge</option>
              <option>Predator 150 Cartridge</option>
              <option>Predator 200 Cartridge</option>
              <option>Predator 50 Cartridge</option>
              <option>Predator 75 Cartridge</option>
              <option>Quad 100 DE</option>
              <option>Quad 60 DE</option>
              <option>Quad 80 DE</option>
              <option>Sand Dollar SD 35 Sand</option>
              <option>Sand Dollar SD 40 Sand</option>
              <option>Sand Dollar SD 60 Sand</option>
              <option>Sand Dollar SD 80 Sand</option>
              <option>Sandpiper 18" Sand</option>
              <option>Sandpiper 24" Sand</option>
              <option>Sandpiper 30" Sand</option>
              <option>Seahorse 300 Fiberglass Cartridge</option>
              <option>Seahorse 300 Stainless Cartridge</option>
              <option>Seahorse 400 Fiberglass Cartridge</option>
              <option>Seahorse 400 Stainless Cartridge</option>
              <option>Seahorse 500 Fiberglass Cartridge</option>
              <option>Seahorse 500 Stainless Cartridge</option>
              <option>SEP 144 Separation Tank</option>
              <option>SEP 48 Separation Tank</option>
              <option>SEP 60 Separation Tank</option>
              <option>SEP 72 Separation Tank</option>
              <option>SEP 96 Separation Tank</option>
              <option>SM 2024 DE</option>
              <option>SM 2036 DE</option>
              <option>SM 2048 DE</option>
              <option>SM 2060 DE</option>
              <option>SM 2072 DE</option>
              <option>SM 4024 DE</option>
              <option>SM 4036 DE</option>
              <option>SM 4048 DE</option>
              <option>SM 4060 DE</option>
              <option>SMBW 2024 DE</option>
              <option>SMBW 2036 DE</option>
              <option>SMBW 2048 DE</option>
              <option>SMBW 2060 DE</option>
              <option>SMBW 2072 DE</option>
              <option>SMBW 4024 DE</option>
              <option>SMBW 4036 DE</option>
              <option>SMBW 4048 DE</option>
              <option>SMBW 4060 DE</option>
              <option>Star ST 35 DE</option>
              <option>Star ST 40 DE</option>
              <option>Star ST 50 DE</option>
              <option>Star ST 80 DE</option>
              <option>System 2 PLD 50 Modular</option>
              <option>System 2 PLD 70 Modular</option>
              <option>System 2 PLDE 36 Modular</option>
              <option>System 2 PLDE 48 Modular</option>
              <option>System 2 PLM 100 Modular</option>
              <option>System 2 PLM 125 Modular</option>
              <option>System 2 PLM 150 Modular</option>
              <option>System 2 PLM 175 Modular</option>
              <option>System 2 PLM 200 Modular</option>
              <option>System 2 PLM 300 Modular</option>
              <option>System 3 S7D75 DE</option>
              <option>System 3 S7M120 Modular</option>
              <option>System 3 S7M400 Modular</option>
              <option>System 3 S7MD60 Modular</option>
              <option>System 3 S7MD72 Modular</option>
              <option>System 3 S7S50 Sand</option>
              <option>System 3 S8D110 DE</option>
              <option>System 3 S8M150 Modular</option>
              <option>System 3 S8M500 Modular</option>
              <option>System 3 S8S70 Sand</option>
              <option>Tagleus TA 100 Sand</option>
              <option>Tagleus TA 100D Sand</option>
              <option>Tagleus TA 30 Sand</option>
              <option>Tagleus TA 30D Sand</option>
              <option>Tagleus TA 35 Sand</option>
              <option>Tagleus TA 35D Sand</option>
              <option>Tagleus TA 40 Sand</option>
              <option>Tagleus TA 40D Sand</option>
              <option>Tagleus TA 50 Sand</option>
              <option>Tagleus TA 50D Sand</option>
              <option>Tagleus TA 60 Sand</option>
              <option>Tagleus TA 60D Sand</option>
              <option>Titan 24 Fiberglass DE</option>
              <option>Titan 24 Stainless DE</option>
              <option>Titan 36 Fiberglass DE</option>
              <option>Titan 36 Stainless DE</option>
              <option>Titan 48 Fiberglass DE</option>
              <option>Titan 48 Stainless DE</option>
              <option>Titan 60 Fiberglass DE</option>
              <option>Titan 60 Stainless DE</option>
              <option>Titan CM 24 DE</option>
              <option>Titan CM 36 DE</option>
              <option>Titan CM 48 DE</option>
              <option>Titan CM 60 DE</option>
              <option>Titan RPM 24 DE</option>
              <option>Titan RPM 36 DE</option>
              <option>Titan RPM 48 DE</option>
              <option>Titan RPM 60 DE</option>
              <option>Triton II TR 100 Sand</option>
              <option>Triton II TR 100HD Sand</option>
              <option>Triton II TR 140 Sand</option>
              <option>Triton II TR 40 Sand</option>
              <option>Triton II TR 50 Sand</option>
              <option>Triton II TR 60 Sand</option>
              <option>Triton TR 100 C-3 Sand</option>
              <option>Triton TR 100C Sand</option>
              <option>Triton TR 140 C-3 Sand</option>
              <option>Triton TR 140C Sand</option>
              <option>Warrior 44GPM DE</option>
              <option>Warrior 66GPM DE</option>
              <option>Warrior 88GPM DE</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Unicel' && (
            <Fragment>
              <option>7699</option>
              <option>8409</option>
              <option>8412</option>
              <option>8414</option>
              <option>8417</option>
              <option>8418</option>
              <option>8600</option>
              <option>9410</option>
              <option>9415</option>
              <option>9419</option>
              <option>9699</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.filterMake === 'Waterway' && (
            <Fragment>
              <option>ClearWater 16" Sand</option>
              <option>ClearWater 19" Sand</option>
              <option>ClearWater 22" Sand</option>
              <option>ClearWater 26" Sand</option>
              <option>Crystal Water Cartridge Filter 325 sq. ft.</option>
              <option>Crystal Water Cartridge Filter 425 sq. ft.</option>
              <option>Crystal Water Cartridge Filter 525 sq. ft.</option>
              <option>Crystal Water Filter DE 36 sq. ft.</option>
              <option>Crystal Water Filter DE 48 sq. ft.</option>
              <option>Crystal Water Filter DE 60 sq. ft.</option>
              <option>PCCF 100 sqft Filter Cartridge</option>
              <option>PCCF 150 sqft Filter Cartridge</option>
              <option>PCCF 200 sqft Filter Cartridge</option>
              <option>Other</option>
            </Fragment>
          )}
        </Input>
      </FormGroup>
    </Fragment>
  );
};

export default FilterManager;
