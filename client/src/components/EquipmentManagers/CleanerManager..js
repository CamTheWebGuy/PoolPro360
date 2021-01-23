import React, { Fragment } from 'react';

import { Label, Input, FormGroup } from 'reactstrap';

const CleanerManager = ({ handleChange, handleBlur, values }) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for='cleanerMake' className='form-control-label'>
          Cleaner Make:
        </Label>
        <Input
          type='select'
          name='cleanerMake'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.cleanerMake}
        >
          <option>Aqua Products</option>
          <option>Hayward</option>
          <option>Jandy</option>
          <option>Maytronics</option>
          <option>Paramount</option>
          <option>Pentair</option>
          <option>Polaris</option>
          <option>SmartPool</option>
          <option>Water Tech</option>
          <option>Other</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for='cleanerModel' className='form-control-label'>
          Cleaner Model:
        </Label>
        <Input
          type='select'
          name='cleanerModel'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.cleanerModel}
        >
          {values.cleanerMake === 'Aqua Products' && (
            <Fragment>
              <option>AquaBot AB</option>
              <option>AquaBot Apex Revive</option>
              <option>AquaBot Bravo</option>
              <option>AquaBot Classic</option>
              <option>AquaBot Fury</option>
              <option>AquaBot Junior</option>
              <option>AquaBot Turbo</option>
              <option>AquaBot Viva</option>
              <option>AquaMAX</option>
              <option>AquaMAX X1</option>
              <option>AquaMAX X2</option>
              <option>AquaMAX X3</option>
              <option>Breeze 4WD</option>
              <option>Breeze XLS</option>
              <option>DuraMAX</option>
              <option>DuraMAX BiTurbo T2</option>
              <option>DuraMAX BiTurbo T-RC</option>
              <option>DuraMAX Duo</option>
              <option>DuraMAX Duo Junior</option>
              <option>DuraMAX Junior T-RC</option>
              <option>DuraMAX RC</option>
              <option>DuraMAX Trio</option>
              <option>EcoJet Essential</option>
              <option>EcoJet Plus</option>
              <option>EcoJet Turbo</option>
              <option>EcoTrak Turbo</option>
              <option>Gemini</option>
              <option>Icon XI</option>
              <option>JetMAX</option>
              <option>JetMAX F24</option>
              <option>JetMAX Junior</option>
              <option>JetMAX Turbo</option>
              <option>JetMAX Ultra</option>
              <option>Magnum</option>
              <option>Magnum Junior</option>
              <option>Mamba</option>
              <option>Pool Rover Hybrid</option>
              <option>Pool Rover Junior</option>
              <option>Pool Rover S2-40</option>
              <option>Pool Rover S2-50</option>
              <option>Pool Rover Sport</option>
              <option>Pura 4X</option>
              <option>Pura 5X</option>
              <option>Rapids 4WD</option>
              <option>Rapids XLS</option>
              <option>Supreme</option>
              <option>Turbo T</option>
              <option>Turbo T2</option>
              <option>Turbo T4RC</option>
              <option>Turbo T-Jet</option>
              <option>UltraMAX</option>
              <option>UltraMAX XL</option>
              <option>Xtreme</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Hayward' && (
            <Fragment>
              <option>AquaBug</option>
              <option>AquaDroid</option>
              <option>AquaNaut 200</option>
              <option>AquaNaut 400</option>
              <option>AquaNaut 450</option>
              <option>AquaVac 500</option>
              <option>AquaVac KingShark 2</option>
              <option>Diver Dave</option>
              <option>DV 5000</option>
              <option>Hayward Blu</option>
              <option>Navigator</option>
              <option>Navigator Pro</option>
              <option>Navigator V-Flex</option>
              <option>Phantom</option>
              <option>Phantom Turbo</option>
              <option>Phoenix 2X</option>
              <option>Phoenix 4X</option>
              <option>PoolVac Classic</option>
              <option>PoolVac Ultra</option>
              <option>PoolVac V-Flex</option>
              <option>PoolVac XL</option>
              <option>SharkVAC</option>
              <option>SharkVAC XL</option>
              <option>The PoolCleaner 2X</option>
              <option>The PoolCleaner 4X</option>
              <option>TigerShark</option>
              <option>TigerShark 2</option>
              <option>TigerShark 2 Plus</option>
              <option>TigerShark Plus</option>
              <option>TigerShark QC</option>
              <option>TriVac 500</option>
              <option>TriVac 700</option>
              <option>VIIO Turbo</option>
              <option>Viper</option>
              <option>W530 Leaf Canister</option>
              <option>W560 Leaf Canister</option>
              <option>Wanda The Whale</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Jandy' && (
            <Fragment>
              <option>Baracuda G2</option>
              <option>Baracuda G3</option>
              <option>Baracuda Pacer</option>
              <option>Baracuda Ranger</option>
              <option>Baracuda X7 Quattro</option>
              <option>Baracuda Zoom</option>
              <option>MX8</option>
              <option>MX8 Elite</option>
              <option>Polaris 140</option>
              <option>Polaris 145</option>
              <option>Polaris 160</option>
              <option>Polaris 165</option>
              <option>Polaris 180</option>
              <option>Polaris 280</option>
              <option>Polaris 280 Black Max</option>
              <option>Polaris 340 Black Max</option>
              <option>Polaris 360</option>
              <option>Polaris 360 Black Max</option>
              <option>Polaris 380</option>
              <option>Polaris 380 Black Max</option>
              <option>Polaris 3900 Sport</option>
              <option>Polaris 480 Pro</option>
              <option>Polaris 60</option>
              <option>Polaris 65</option>
              <option>Polaris 9300 Sport</option>
              <option>Polaris 9300xi Sport</option>
              <option>Polaris 9350 Sport</option>
              <option>Polaris 9400 Sport</option>
              <option>Polaris 9450 Sport</option>
              <option>Polaris 9550 Sport</option>
              <option>Polaris 9650iQ Sport</option>
              <option>Polaris ATV</option>
              <option>Polaris P38</option>
              <option>Polaris P39</option>
              <option>Polaris P825</option>
              <option>Polaris P945</option>
              <option>Polaris P955</option>
              <option>Polaris Raptor</option>
              <option>Polaris Turbo Turtle</option>
              <option>Ray-Vac</option>
              <option>Ray-Vac Desert Model</option>
              <option>
                Zodiac Baracuda Automatic Suction Inground Swimming Pool Cleaner
                w/Hoses MX6
              </option>
              <option>Zodiac Cyclonic Leaf Catcher</option>
              <option>Zodiac MX6</option>
              <option>Zodiac MX8</option>
              <option>Zodiac Ranger</option>
              <option>Zodiac T3</option>
              <option>Zodiac T5 Duo</option>
              <option>Zodiac Wahoo</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Maytronics' && (
            <Fragment>
              <option>2X2</option>
              <option>3001</option>
              <option>Active 3</option>
              <option>Active 4</option>
              <option>Active 5</option>
              <option>Active 5 LIBerty</option>
              <option>Active Classic</option>
              <option>Advantage Plus</option>
              <option>Advantage Plus Pro RC</option>
              <option>Bio-S</option>
              <option>C4</option>
              <option>Comfort Active</option>
              <option>Delux Active</option>
              <option>Delux Liberty</option>
              <option>Deluxe 3</option>
              <option>Deluxe 4</option>
              <option>Diagnostic 2001</option>
              <option>Diagnostic 3001</option>
              <option>DLHD</option>
              <option>DX3</option>
              <option>DX3S</option>
              <option>DX4</option>
              <option>DX4S</option>
              <option>DX5+S</option>
              <option>DX6</option>
              <option>Dynamic</option>
              <option>Dynamic Plus</option>
              <option>E10</option>
              <option>E20</option>
              <option>Easy Comfort</option>
              <option>Explorer</option>
              <option>Explorer Plus</option>
              <option>Hybrid DX2</option>
              <option>Hybrid Platinum</option>
              <option>Hybrid RS1</option>
              <option>Master M3</option>
              <option>Master M4</option>
              <option>Master M5</option>
              <option>Moby</option>
              <option>Nautilus</option>
              <option>Neptune</option>
              <option>Oasis Z5</option>
              <option>Primal X3</option>
              <option>Prox2</option>
              <option>S100</option>
              <option>S200</option>
              <option>S300</option>
              <option>S300i</option>
              <option>Smart Active</option>
              <option>Sprite C</option>
              <option>Sprite RC</option>
              <option>Supreme LIBerty</option>
              <option>Supreme M3</option>
              <option>Supreme M4</option>
              <option>Supreme M4 Pro</option>
              <option>Supreme M5</option>
              <option>Swash</option>
              <option>Swash CL</option>
              <option>Swash TC</option>
              <option>Swift</option>
              <option>Thunder 10</option>
              <option>Thunder 20</option>
              <option>Thunder 30</option>
              <option>Triton</option>
              <option>Wave 100</option>
              <option>Wave 30</option>
              <option>Wave 300 XL</option>
              <option>Wave 50</option>
              <option>Zenit 10</option>
              <option>Zenit 15</option>
              <option>Zenit 20</option>
              <option>Zenit 30</option>
              <option>Zenit LIBerty</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Paramount' && (
            <Fragment>
              <option>Infloor 6 Port Gear Box</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Pentair' && (
            <Fragment>
              <option>Great White</option>
              <option>Jet Vac JV105</option>
              <option>Kreepy Kadet</option>
              <option>Kreepy Krauly 1993 &amp; Prior Model</option>
              <option>Kreepy Krauly 1994-1999 Model</option>
              <option>Kreepy Krauly 2000 Model</option>
              <option>Kreepy Krauly Legend II LX2000</option>
              <option>Kreepy Krauly Legend II LX5000G</option>
              <option>Kreepy Krauly Legend LL505G</option>
              <option>Kreepy Krauly Platinum LL505PMG</option>
              <option>Kreepy Krauly Platinum LL50PMG</option>
              <option>Kreepy Krauly Prowler 920</option>
              <option>Kreepy Krauly SandShark</option>
              <option>Kreepy Krauly Warrior</option>
              <option>Kreepy Kruiser</option>
              <option>Legend 3-Wheel</option>
              <option>Legend 4-Wheel LL105</option>
              <option>Lil Shark</option>
              <option>Model 179 Leaf Canister</option>
              <option>Model 180 Leaf Canister</option>
              <option>Model 186 Leaf Canister</option>
              <option>PoolShark</option>
              <option>Prowler 710</option>
              <option>Prowler 720</option>
              <option>Prowler 730</option>
              <option>Prowler 820</option>
              <option>Prowler 830</option>
              <option>Prowler 920</option>
              <option>Prowler 930</option>
              <option>Racer</option>
              <option>Rebel</option>
              <option>Vac-Mate</option>
              <option>Warrior</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Polaris' && (
            <Fragment>
              <option>165</option>
              <option>180</option>
              <option>280 Black Max</option>
              <option>360 Black Max</option>
              <option>7240 Sport</option>
              <option>8050 Sport</option>
              <option>9350 Sport</option>
              <option>9450 Sport</option>
              <option>9550 Sport</option>
              <option>9650iQ Sport</option>
              <option>Quattro Sport</option>
              <option>TR28P</option>
              <option>TR35P</option>
              <option>TR36P</option>
              <option>Turbo Turtle</option>
              <option>Vac-Sweep 280</option>
              <option>Vac-Sweep 360</option>
              <option>Vac-Sweep 380</option>
              <option>Vac-Sweep 3900 Sport</option>
              <option>Vac-Sweep 65</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'SmartPool' && (
            <Fragment>
              <option>11i</option>
              <option>4i</option>
              <option>7i</option>
              <option>9i</option>
              <option>BigFoot</option>
              <option>Climber NC51</option>
              <option>Climber NC52</option>
              <option>Climber NC52S</option>
              <option>Direct Command</option>
              <option>Direct Command-PLUS</option>
              <option>Kleen-Machine</option>
              <option>Scrubber60</option>
              <option>Scrubber60-PLUS</option>
              <option>SmartKleen</option>
              <option>Other</option>
            </Fragment>
          )}

          {values.cleanerMake === 'Water Tech' && (
            <Fragment>
              <option>Blue Diamond</option>
              <option>Blue Diamond Pro</option>
              <option>Blue Diamond RC</option>
              <option>Blue Pearl</option>
              <option>PB Hercules Power-Rated 5000</option>
              <option>PB Hercules Power-Rated 6000</option>
              <option>PB Hercules Power-Rated 7000</option>
              <option>PB Hercules Power-Rated 8000</option>
              <option>PB Hercules Power-Rated 9000</option>
              <option>PB Speed Jet</option>
              <option>Other</option>
            </Fragment>
          )}
        </Input>
      </FormGroup>
    </Fragment>
  );
};

export default CleanerManager;
