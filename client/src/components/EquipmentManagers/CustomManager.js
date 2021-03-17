import React, { Fragment } from 'react';

import { Label, Input, FormGroup, Row, Col } from 'reactstrap';

const CustomManager = ({
  itemsList,
  handleCategoryChange,
  handleBlur,
  handleChange,
  handleMakeChange,
  handleModelChange
}) => {
  return (
    <Fragment>
      {itemsList.length >= 1 && (
        <Fragment>
          {itemsList.map(item => (
            <Row key={item.itentifier}>
              <Col lg='4'>
                <FormGroup>
                  <Label for='category' className='form-control-label'>
                    Category:
                  </Label>
                  <Input
                    type='select'
                    name='category'
                    onChange={data =>
                      handleCategoryChange(item.itentifier, data)
                    }
                    onBlur={handleBlur}
                  >
                    <option>Cleaners</option>
                    <option>Control Systems</option>
                    <option>Filters</option>
                    <option>Heaters</option>
                    <option>Infloor</option>
                    <option>Lights</option>
                    <option>Pumps</option>
                    {/* <option>Reels</option> */}
                    <option>Sanitizers</option>
                    <option>Valves</option>
                    <option>Water Features</option>
                    <option>White Goods</option>
                    <option>Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='4'>
                <FormGroup>
                  <Label for='make' className='form-control-label'>
                    Make:
                  </Label>
                  <Input
                    type='select'
                    name='make'
                    onChange={data => handleMakeChange(item.itentifier, data)}
                    onBlur={handleBlur}
                  >
                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Cleaners' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Aqua Products</option>
                        <option>Hayward</option>
                        <option>Jandy</option>

                        <option>Paramount</option>
                        <option>Pentair</option>
                        <option>Polaris</option>

                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Control Systems' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Hayward</option>
                        <option>Intermatic</option>
                        <option>Jandy</option>
                        <option>Pentair</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Filters' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Anthony</option>
                        <option>Harmsco</option>
                        <option>Hayward</option>
                        <option>Jacuzzi</option>
                        <option>Jandy</option>
                        <option>Pac-Fab</option>
                        <option>Pentair</option>
                        <option>Unicel</option>
                        <option>Waterway</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Heaters' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>AquaCal</option>

                        <option>Hayward</option>
                        <option>Jandy</option>
                        <option>Pentair</option>
                        <option>Rheem / Raypak</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Infloor' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>A & A</option>
                        <option>Blue Square</option>
                        <option>Paramount</option>
                        <option>Zodiac</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Lights' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Fiberstars</option>
                        <option>Hayward</option>
                        <option>Jandy</option>
                        <option>PAL</option>
                        <option>Pentair</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Pumps' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Anthony</option>
                        <option>Aqua-Flo</option>
                        <option>Everbilt</option>

                        <option>Hayward</option>
                        <option>Jacuzzi</option>
                        <option>Jandy</option>
                        <option>Pentair</option>
                        <option>Polaris</option>
                        <option>Premier</option>
                        <option>Sta-Rite</option>

                        <option>Waterway</option>

                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Reels' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Feherguard</option>
                        <option>GLI Corp</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Sanitizers' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>A &amp; A</option>
                        <option>AirSep</option>
                        <option>AutoPilot</option>
                        <option>Biolab / Guardex</option>
                        <option>ClearWater</option>
                        <option>CMP</option>
                        <option>Compu Pool</option>
                        <option>Del Ozone</option>
                        <option>Delta UV</option>
                        <option>Eco-Matic</option>
                        <option>EZ Clor</option>
                        <option>Hayward</option>
                        <option>IPS</option>
                        <option>Jacuzzi</option>
                        <option>Jandy</option>
                        <option>King Technology</option>
                        <option>Nature2</option>
                        <option>Paramount</option>
                        <option>Pentair</option>
                        <option>Rola-Chem</option>
                        <option>SGS</option>
                        <option>SmartPool</option>
                        <option>SpectraLight</option>
                        <option>Super-pro</option>
                        <option>Watermaid</option>
                        <option>Waterway</option>
                        <option>Zodiac</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Valves' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Anthony</option>
                        <option>Baker Hydro</option>
                        <option>Hayward</option>
                        <option>Jacuzzi</option>
                        <option>Jandy</option>
                        <option>Pentair</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'Water Features' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>Air Supply</option>
                        <option>Jandy</option>
                        <option>Pentair</option>
                        <option>Polaris</option>
                        <option>Other</option>
                      </Fragment>
                    )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].category === 'White Goods' && (
                      <Fragment>
                        <option disabled selected>
                          Choose One
                        </option>
                        <option>A & A</option>
                        <option>Aquastar</option>

                        <option>Hayward</option>

                        <option>Pentair</option>
                        <option>Super-Pro</option>
                        <option>Waterway</option>

                        <option>Other</option>
                      </Fragment>
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='4'>
                {' '}
                <FormGroup>
                  <Label for='model' className='form-control-label'>
                    Model:
                  </Label>
                  <Input
                    type='select'
                    name='model'
                    onChange={data => handleModelChange(item.itentifier, data)}
                    onBlur={handleBlur}
                  >
                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Aqua Products' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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
                            Zodiac Baracuda Automatic Suction Inground Swimming
                            Pool Cleaner w/Hoses MX6
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Maytronics' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Paramount' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Infloor 6 Port Gear Box</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Polaris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'SmartPool' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Water Tech' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Cleaners' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Control Systems' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Aqua Connect</option>
                          <option>Aqua Logic</option>
                          <option>Aqua Plus</option>
                          <option>Aqua Rite</option>
                          <option>Aqua Rite Pro</option>
                          <option>Aqua Trol</option>
                          <option>E-Command 4</option>
                          <option>Omni Logic</option>
                          <option>On Command</option>
                          <option>Pool Boss PSC2201</option>
                          <option>Pool Boss PSC2202</option>
                          <option>Pro Logic</option>
                          <option>PSC 2100</option>
                          <option>PSC 2101</option>
                          <option>PSC 2104</option>
                          <option>PSC 2105</option>
                          <option>PSC 2106</option>
                          <option>PSC 2109</option>
                          <option>Sense and Dispense</option>
                          <option>VS Omni</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Intermatic' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Control Systems' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            Electronic Controls, P1353ME, Digital 3 Circuit Time
                            Control Mechanism
                          </option>
                          <option>
                            Electronic Controls, P4043ME, Valve Actuator Control
                          </option>
                          <option>
                            Electronic Controls, P5043ME, Multiwave Expansion
                            Model
                          </option>
                          <option>
                            Electronic Controls, P7103ME, 7-Day Electronic Times
                            Switch Mechanism
                          </option>
                          <option>
                            Electronic Controls, PB313E, 24-Hour Electronic
                            Panel Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PB313EK, 24-Hour Electronic
                            Panel Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PB314E, 24-Hour Electronic
                            Panel Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PB314EK, 24-Hour Electronic
                            Panel Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PB373E, 7-Day Electronic Panel
                            Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PB374E, 7-Day Electronic Panel
                            Mount Timer
                          </option>
                          <option>
                            Electronic Controls, PE103, Electronic Pump Motor
                            Controller with Seasonal Adjustment and Type 3R
                            Metal Enclosure
                          </option>
                          <option>
                            Electronic Controls, PE140, Valve Actuator Control
                          </option>
                          <option>
                            Electronic Controls, PE153, Digital 3-Circuit Time
                            Control with Type 3R Metal Enclosure
                          </option>
                          <option>
                            Electronic Controls, PE153F, Digital 3-Circuit Time
                            Control with Type 3R Metal Enclosure and Freeze
                            Probe
                          </option>
                          <option>
                            Electronic Controls, PE153P, Digital 3-Circuit Time
                            Control with Type 3R Plastic Enclosure
                          </option>
                          <option>
                            Electronic Controls, PE153PF, Digital 3-Circuit Time
                            Control with Type 3R Plastic Enclosure and Freeze
                            Probe
                          </option>
                          <option>
                            Electronic Controls, PE2000, 60-amp Pool/Spa Type 3R
                            Load Center
                          </option>
                          <option>
                            Electronic Controls, PE24VA, 24-Volt Valve Actuator
                          </option>
                          <option>
                            Electronic Controls, PE25065RC, Multiwave ESC System
                            with Expansion Module
                          </option>
                          <option>
                            Electronic Controls, PE25300, 60-amp Load Center
                            with Mechanism
                          </option>
                          <option>
                            Electronic Controls, PE25300F, 60-amp Load Center
                            with Mechanism and Freeze Probe
                          </option>
                          <option>
                            Electronic Controls, PE3000, 80-amp Pool/Spa Type 3R
                            Load Center
                          </option>
                          <option>
                            Electronic Controls, PE3000RC, Multiwave Basic with
                            80-amp Load Center
                          </option>
                          <option>
                            Electronic Controls, PE3000T3, 80-amp Load Center
                            with 300-watt Transformer
                          </option>
                          <option>
                            Electronic Controls, PE30065RCT3, Multiwave Basic
                            with 80-amp Load Center with 300-watt Transformer
                          </option>
                          <option>
                            Electronic Controls, PE3506RC, Multiwave ESC System
                            with 80-amp Load Center, Expansion Module and two
                            Valve Actuators
                          </option>
                          <option>
                            Electronic Controls, PE35300, 80-amp Load Center
                            with Mechanism
                          </option>
                          <option>
                            Electronic Controls, PE653, 5-Circuit Wireless
                            Receiver
                          </option>
                          <option>
                            Electronic Controls, PE653RC, Multiwave Basic
                            Control System
                          </option>
                          <option>
                            Freeze Protection, PF1103T, Single Circuit Freeze
                            Protection
                          </option>
                          <option>
                            Freeze Protection, PF1112T, Control System with
                            Freeze Protection and Power Center with T104M
                            Mechanism
                          </option>
                          <option>
                            Freeze Protection, PF1202T, Control System with
                            Freeze Protection and Power Center with two T104M
                            Mechanisms
                          </option>
                          <option>
                            Freeze Protection, PF1222TB1, Control System with
                            Freeze Protection and Load Center with two T104M
                            Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, PB873MKZ, 7-Day Panel Mount
                            Timer
                          </option>
                          <option>
                            Mechanical Controls, PB913N, 24-Hour Panel Mount
                            Timer
                          </option>
                          <option>
                            Mechanical Controls, PB913N66, 24-Hour Panel Mount
                            Timer with Manual Override
                          </option>
                          <option>
                            Mechanical Controls, PB913N84, 24-Hour Panel Mount
                            Timer with Manual Override
                          </option>
                          <option>
                            Mechanical Controls, PB914N, 24-Hour Panel Mount
                            Timer
                          </option>
                          <option>
                            Mechanical Controls, PB914N66, 24-Hour Panel Mount
                            Timer with Manual Override
                          </option>
                          <option>
                            Mechanical Controls, PB914N84, 24-Hour Panel Mount
                            Timer with Manual Override
                          </option>
                          <option>
                            Mechanical Controls, T10000R, Pool/Spa Type 3R Power
                            Center
                          </option>
                          <option>
                            Mechanical Controls, T10004R, 30-amp Power Center
                            with T104M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T10004RT1, Control System with
                            Transformer and 100-watt Power Center with T104M
                            Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T10004RT3, Control System with
                            Transformer and 300-watt Power Center with T104M
                            Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T10101R, 30-amp Power Center
                            with two T101M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T101M, 24-Hour Mechanical Time
                            Switch
                          </option>
                          <option>
                            Mechanical Controls, T101P201, 24-Hour Mechanical
                            Time Switch in Enclosure with Pool Heater Protection
                          </option>
                          <option>
                            Mechanical Controls, T101P3, 24-Hour Mechanical Time
                            Switch in Enclosure
                          </option>
                          <option>
                            Mechanical Controls, T101R201, 24-Hour Mechanical
                            Time Switch in Enclosure with Pool Heater Protection
                          </option>
                          <option>
                            Mechanical Controls, T101R3, 24-Hour Mechanical Time
                            Switch in Enclosure
                          </option>
                          <option>
                            Mechanical Controls, T103M, 24-Hour Mechanical Time
                            Switch
                          </option>
                          <option>
                            Mechanical Controls, T10404R, 30-amp Power Center
                            with two T104M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T104P201, 24-Hour Mechanical
                            Time Switch in Enclosure with Pool Heater Protection
                          </option>
                          <option>
                            Mechanical Controls, T104P3, 24-Hour Mechanical Time
                            Switch
                          </option>
                          <option>
                            Mechanical Controls, T104R201, 24-Hour Mechanical
                            Time Switch in Enclosure with Pool Heater Protection
                          </option>
                          <option>
                            Mechanical Controls, T104R3, 24-Hour Mechanical Time
                            Switch
                          </option>
                          <option>
                            Mechanical Controls, T10604R, 30-amp Power Center
                            with T106M and T104M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T106P3, 24-Hour Mechanical Time
                            Switch
                          </option>
                          <option>
                            Mechanical Controls, T12404R, 30-amp Power Center
                            with T104M201 and T104M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T21000R, 60-amp Pool/Spa Type
                            3R Load Center
                          </option>
                          <option>
                            Mechanical Controls, T21001R, 60-amp Load Center
                            with T101M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T21004R, 60-amp Load Center
                            with T104M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T30000R5, 100-amp Pool/Spa Type
                            3R Load Center
                          </option>
                          <option>
                            Mechanical Controls, T30004R, 100-amp Load Center
                            with T101M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T30401R, 100-amp Power Center
                            with T104M and T101M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T30404R, 100-amp Load Center
                            with two T101M Mechanism
                          </option>
                          <option>
                            Mechanical Controls, T30604R, 100-amp Load Center
                            with T106M and T104M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T32404R, 100-amp Load Center
                            with T104M201 and T104M Mechanisms
                          </option>
                          <option>
                            Mechanical Controls, T40000R4, 125-amp Load Center
                            with Compartment for Optional Wiring Devices
                          </option>
                          <option>
                            Surge Protection, IG1200RC3, Type 1 or Type 2 Surge
                            Protective Device
                          </option>
                          <option>
                            Surge Protection, PS3000, Surge Protective Device
                          </option>
                          <option>
                            Transformers, PX100, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX100S, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX300, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX300S, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX50, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX50S, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX600, Safety Transformer
                          </option>
                          <option>
                            Transformers, PX600S, Safety Transformer{' '}
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Control Systems' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>AquaLink RS 12 Combo</option>
                          <option>AquaLink RS 12 Only</option>
                          <option>AquaLink RS 16 Combo</option>
                          <option>AquaLink RS 16 Only</option>
                          <option>AquaLink RS 2/10 Dual</option>
                          <option>AquaLink RS 2/12 Dual</option>
                          <option>AquaLink RS 2/22 Dual</option>
                          <option>AquaLink RS 2/30 Dual</option>
                          <option>AquaLink RS 2/6 Dual</option>
                          <option>AquaLink RS 24 Combo</option>
                          <option>AquaLink RS 24 Only</option>
                          <option>AquaLink RS 32 Combo</option>
                          <option>AquaLink RS 32 Only</option>
                          <option>AquaLink RS 4 Combo</option>
                          <option>AquaLink RS 4 Only</option>
                          <option>AquaLink RS 6 Combo</option>
                          <option>AquaLink RS 6 Only</option>
                          <option>AquaLink RS 8 Combo</option>
                          <option>AquaLink RS 8 Only</option>
                          <option>AquaLink Z4 Combo</option>
                          <option>AquaLink Z4 Only</option>
                          <option>AquaPalm</option>
                          <option>AquaSwitch</option>
                          <option>iAquaLink</option>
                          <option>iAquaLink 2.0</option>
                          <option>JI 2000</option>
                          <option>Levolor Water Leveler</option>
                          <option>PDA Controller</option>
                          <option>RS All Button Controller</option>
                          <option>RS One Touch Controller</option>
                          <option>VS Mobile Pump Interface IQPUMP01</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Control Systems' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            4-BUTTON IS4 REMOTE CONTROL WHITE 100'
                          </option>
                          <option>
                            4-BUTTON IS4 REMOTE CONTROL WHITE 150'{' '}
                          </option>
                          <option>Compool CP3800</option>
                          <option>Compool LX100</option>
                          <option>Compool LX200</option>
                          <option>Compool LX220</option>
                          <option>Compool LX30</option>
                          <option>Compool LX3600</option>
                          <option>Compool LX3800</option>
                          <option>Compool LX3810</option>
                          <option>Compool LX3830</option>
                          <option>Compool LX80</option>
                          <option>EasyTouch 4 Pool &amp; Spa</option>
                          <option>EasyTouch 4 Single Body</option>
                          <option>EasyTouch 8 Pool &amp; Spa</option>
                          <option>EasyTouch 8 Single Body</option>
                          <option>EasyTouch PSL4</option>
                          <option>EasyTouch PSL4 Indoor control</option>
                          <option>EasyTouch PSL4 wireless control</option>
                          <option>EasyTouch PSL4 with ScreenLogic</option>
                          <option>IntelliCenter i10PS</option>
                          <option>IntelliCenter i5P</option>
                          <option>IntelliCenter i5PS</option>
                          <option>IntelliCenter i8P</option>
                          <option>IntelliCenter i8PS</option>
                          <option>IntelliChem</option>
                          <option>IntelliComm II Interface Adapter</option>
                          <option>IntelliConnect</option>
                          <option>Intellilevel</option>
                          <option>IntellipH</option>
                          <option>IntelliTouch i10</option>
                          <option>IntelliTouch i5</option>
                          <option>IntelliTouch i7</option>
                          <option>IntelliTouch i9</option>
                          <option>ScreenLogic II</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Anthony' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Bronze 1 1/2 HP</option>
                          <option>Bronze 1 HP</option>
                          <option>Bronze 2 HP</option>
                          <option>Bronze 3/4 HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Anthony' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Aqua-Flo' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Everbilt' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            1.5-HP 230/115-Volt In-Ground Pool Pump with
                            Protector Technology
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Harris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>ProForce 1.5HP</option>
                          <option>ProForce 1HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jacuzzi' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 3 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 3/4 HP
                          </option>
                          <option>WhisperFlo High Performance 1 1/2 HP</option>
                          <option>WhisperFlo High Performance 1 HP</option>
                          <option>WhisperFlo High Performance 1/2 HP</option>
                          <option>WhisperFlo High Performance 2 1/2 HP</option>
                          <option>WhisperFlo High Performance 2 HP</option>
                          <option>WhisperFlo High Performance 3 HP</option>
                          <option>WhisperFlo High Performance 3/4 HP</option>
                          <option>
                            WhisperFlo Standard Full Rated 1 1/2 HP
                          </option>
                          <option>WhisperFlo Standard Full Rated 1 HP</option>
                          <option>WhisperFlo Standard Full Rated 1/2 HP</option>
                          <option>WhisperFlo Standard Full Rated 2 HP</option>
                          <option>WhisperFlo Standard Full Rated 3 HP</option>
                          <option>WhisperFlo Standard Full Rated 3/4 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 1 1/2 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 1 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 2 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 3 HP</option>
                          <option>
                            WhisperFlo Up Rated High Performance 1 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 1 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 2 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 3/4 HP
                          </option>
                          <option>WhisperFlo XF 2 1/2 HP</option>
                          <option>WhisperFlo XF 2 HP</option>
                          <option>WhisperFlo XF 3 HP</option>
                          <option>WhisperFlo XF 5 HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Polaris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>PB4-60 3/4 HP Booster Pump</option>
                          <option>PB4SQ Booster Pump</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Premier' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Model 555N</option>
                          <option>Model 556N</option>
                          <option>Model 575N</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Sta-Rite' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Max-E-Pro</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Water Wizard' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>5-MSP 1200GPH 115V with 25' Cord</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Waterway' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Filters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Iron Might 1/15HP 3410030-1E</option>
                          <option>SMF-110 1HP</option>
                          <option>SMF-115 1.5HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'AquaCal' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            Great Big Bopper BB500BRDSBNA Heat Pump
                          </option>
                          <option>
                            Great Big Bopper BB500DRDSBNA Heat Pump
                          </option>
                          <option>
                            Great Big Bopper BB500GRDSBNA Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ110R 1 Phase Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ120R 1 Phase 50Hz Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ120R 1 Phase 60Hz Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ120R 3 Phase Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ166R 1 Phase Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ166R 3 Phase Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ175 1 Phase Heat Pump
                          </option>
                          <option>
                            HeatWave SuperQuiet SQ175 3 Phase Heat Pump
                          </option>
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
                          <option>
                            Water Source WS03 1 Phase 60Hz Heat Pump
                          </option>
                          <option>
                            Water Source WS05 1 Phase 60Hz Heat Pump
                          </option>
                          <option>
                            Water Source WS05 3 Phase 50Hz Heat Pump
                          </option>
                          <option>
                            Water Source WS05 3 Phase 60Hz Heat Pump
                          </option>
                          <option>
                            Water Source WS10 1 Phase 60Hz Heat Pump
                          </option>
                          <option>
                            Water Source WS10 3 Phase 60Hz Heat Pump
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Built Right' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>115XW</option>
                          <option>135XW</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'GulfStream' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Iron Might 1/15HP 3410030-1E</option>
                          <option>SMF-110 1HP</option>
                          <option>SMF-115 1.5HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Rheem / Raypak' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Heaters' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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
                          <option>
                            Model C-R206A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model C-R206A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model C-R207A Low Nox NG</option>
                          <option>Model C-R266A Digital Copper LP</option>
                          <option>Model C-R266A Digital Copper NG</option>
                          <option>Model C-R266A Digital Cupro-Nickle LP</option>
                          <option>Model C-R266A Digital Cupro-Nickle NG</option>
                          <option>Model C-R266A Millivolt Copper LP</option>
                          <option>Model C-R266A Millivolt Copper NG</option>
                          <option>
                            Model C-R266A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model C-R266A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model C-R267A Low Nox NG</option>
                          <option>Model C-R336A Digital Copper LP</option>
                          <option>Model C-R336A Digital Copper NG</option>
                          <option>Model C-R336A Digital Cupro-Nickle LP</option>
                          <option>Model C-R336A Digital Cupro-Nickle NG</option>
                          <option>Model C-R336A Millivolt Copper LP</option>
                          <option>Model C-R336A Millivolt Copper NG</option>
                          <option>
                            Model C-R336A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model C-R336A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model C-R337A Low Nox NG</option>
                          <option>Model C-R406A Digital Copper LP</option>
                          <option>Model C-R406A Digital Copper NG</option>
                          <option>Model C-R406A Digital Cupro-Nickle LP</option>
                          <option>Model C-R406A Digital Cupro-Nickle NG</option>
                          <option>Model C-R406A Millivolt Copper LP</option>
                          <option>Model C-R406A Millivolt Copper NG</option>
                          <option>
                            Model C-R406A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model C-R406A Millivolt Cupro-Nickle NG
                          </option>
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
                          <option>
                            Model P-R206A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model P-R206A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model P-R207A Low Nox NG</option>
                          <option>Model P-R266A Digital Copper LP</option>
                          <option>Model P-R266A Digital Copper NG</option>
                          <option>Model P-R266A Digital Cupro-Nickle LP</option>
                          <option>Model P-R266A Digital Cupro-Nickle NG</option>
                          <option>Model P-R266A Millivolt Copper LP</option>
                          <option>Model P-R266A Millivolt Copper NG</option>
                          <option>
                            Model P-R266A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model P-R266A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model P-R267A Low Nox NG</option>
                          <option>Model P-R336A Digital Copper LP</option>
                          <option>Model P-R336A Digital Copper NG</option>
                          <option>Model P-R336A Digital Cupro-Nickle LP</option>
                          <option>Model P-R336A Digital Cupro-Nickle NG</option>
                          <option>Model P-R336A Millivolt Copper LP</option>
                          <option>Model P-R336A Millivolt Copper NG</option>
                          <option>
                            Model P-R336A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model P-R336A Millivolt Cupro-Nickle NG
                          </option>
                          <option>Model P-R337A Low Nox NG</option>
                          <option>Model P-R406A Digital Copper LP</option>
                          <option>Model P-R406A Digital Copper NG</option>
                          <option>Model P-R406A Digital Cupro-Nickle LP</option>
                          <option>Model P-R406A Digital Cupro-Nickle NG</option>
                          <option>Model P-R406A Millivolt Copper LP</option>
                          <option>Model P-R406A Millivolt Copper NG</option>
                          <option>
                            Model P-R406A Millivolt Cupro-Nickle LP
                          </option>
                          <option>
                            Model P-R406A Millivolt Cupro-Nickle NG
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'A & A' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Infloor' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Gamma 3</option>
                          <option>Gamma 4</option>
                          <option>Gould Valve 5 Port</option>
                          <option>Low Profile Valve 2 Port 1.5"</option>
                          <option>Low Profile Valve 2 Port 2"</option>
                          <option>Low Profile Valve 3 Port 1.5"</option>
                          <option>Low Profile Valve 3 Port 2"</option>
                          <option>Low Profile Valve 6 Port 1.5"</option>
                          <option>Low Profile Valve 6 Port 2"</option>
                          <option>MagnaSweep 2-Prong</option>
                          <option>MagnaSweep 3-Prong</option>
                          <option>MagnaSweep vforce</option>
                          <option>QuikClean</option>
                          <option>QuikClean X-treme</option>
                          <option>RetroClean</option>
                          <option>Style 1</option>
                          <option>Style 2</option>
                          <option>Top Feed Valve 5 Port</option>
                          <option>Top Feed Valve 6 Port</option>
                          <option>TurboClean</option>
                          <option>TurboClean X-treme</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Blue Square' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Infloor' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Q360</option>
                          <option>Q360 Valve</option>
                          <option>R360</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Paramount' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Infloor' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>6 Port Gear Box</option>
                          <option>Cyclean</option>
                          <option>EcoPool</option>
                          <option>PCC2000</option>
                          <option>Pool Valet</option>
                          <option>Pool Valet Next Generation</option>
                          <option>PV3</option>
                          <option>Retro Jet</option>
                          <option>StepClean</option>
                          <option>SwingSweep</option>
                          <option>Valve 2 Port 4 Gear Module</option>
                          <option>Valve 2 Port 5 Gear Module</option>
                          <option>Valve 3 Port</option>
                          <option>Valve 4 Port</option>
                          <option>Valve 6 Port</option>
                          <option>Vanquish</option>
                          <option>Vantage</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Zodiac' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Infloor' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Caretaker 99 Bayonet</option>
                          <option>Caretaker 99 Threaded</option>
                          <option>Caretaker Valve 5 Port 1 1/2"</option>
                          <option>Caretaker Valve 5 Port 2"</option>
                          <option>Caretaker Valve 8 Port</option>
                          <option>UltraFlex 2 Valve</option>
                          <option>UltraFlex Valve</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Fiberstars' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Lights' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            2004 Illuminator 4 Position 250W 120V Pool/Spa
                          </option>
                          <option>
                            2004-AS Illuminator 4 Position 250W 120V Pool/Spa
                          </option>
                          <option>
                            409 Illuminator 4 Position 150W Pool/Spa
                          </option>
                          <option>
                            409 Illuminator 8 Position 150W Pool/Spa
                          </option>
                          <option>
                            409 Illuminator White Only 150W Pool/Spa
                          </option>
                          <option>
                            6004 Illuminator 4 Position 200W 120V Pool/Spa
                          </option>
                          <option>
                            6004-AS Illuminator 4 Position 200W 120V Pool/Spa
                          </option>
                          <option>FS5 Illuminator 250W 24V Pool/Spa</option>
                          <option>PT6000 Illuminator</option>
                          <option>WIRTRAN Power Center &amp; Remote</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Lights' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>AstroLite 100W 12V Pool</option>
                          <option>AstroLite 300W 120V Pool</option>
                          <option>AstroLite 300W 12V Pool</option>
                          <option>AstroLite 400W 120V Pool</option>
                          <option>AstroLite 500W 120V Pool</option>
                          <option>AstroLite II 100W 120V Spa</option>
                          <option>AstroLite II 250W 120V Spa</option>
                          <option>AstroLite II 75W 12V Spa</option>
                          <option>ColorLogic 160 12V Accent</option>
                          <option>ColorLogic 320 12V Accent</option>
                          <option>ColorLogic 4.0 LED Plastic Pool</option>
                          <option>ColorLogic 4.0 LED Plastic Spa</option>
                          <option>ColorLogic 4.0 LED Stainless Pool</option>
                          <option>ColorLogic 4.0 LED Stainless Spa</option>
                          <option>CrystaLogic 160 LED 12V Accent</option>
                          <option>CrystaLogic 320 LED 12V Accent</option>
                          <option>DuraLite 100W 12V Pool</option>
                          <option>DuraLite 300W 120V Pool</option>
                          <option>DuraLite 300W 12V Pool</option>
                          <option>DuraLite 500W 120V Pool</option>
                          <option>Model SP0500 100W 12V Pool</option>
                          <option>Model SP0500 300W 12V Pool</option>
                          <option>Model SP0501 100W 12V Pool</option>
                          <option>Model SP0501 300W 12V Pool</option>
                          <option>Model SP0502 100W 12V Pool</option>
                          <option>Model SP0502 300W 12V Pool</option>
                          <option>Model SP0503 400W 120V Pool</option>
                          <option>
                            Model SP0503 500W 120V Medium Base Pool
                          </option>
                          <option>
                            Model SP0503 500W 120V Mogul Base Pool
                          </option>
                          <option>Model SP0504 400W 120V Pool</option>
                          <option>
                            Model SP0504 500W 120V Medium Base Pool
                          </option>
                          <option>
                            Model SP0504 500W 120V Mogul Base Pool
                          </option>
                          <option>StarLite 100W 12V Pool</option>
                          <option>StarLite 300W 120V Pool</option>
                          <option>StarLite 300W 12V Pool</option>
                          <option>StarLite 500W 120V Pool</option>
                          <option>Universal ColorLogic LED 12V Pool</option>
                          <option>Universal ColorLogic LED 12V Spa</option>
                          <option>
                            Universal CrystaLogic LED 100W 12V Spa
                          </option>
                          <option>
                            Universal CrystaLogic LED 300W 12V Pool
                          </option>
                          <option>
                            Universal CrystaLogic LED 500W 12V Pool
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Lights' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Nicheless Blue LED 10W 12V Accent</option>
                          <option>Nicheless Blue LED 15W 12V Accent</option>
                          <option>Nicheless Color LED 12V JLU4C12W100</option>
                          <option>Nicheless Color LED 12V JLU4C12W150</option>
                          <option>Nicheless Color LED 12V JLU4C12W50</option>
                          <option>Nicheless Color LED 12V JLU4C24W100</option>
                          <option>Nicheless Color LED 12V JLU4C24W150</option>
                          <option>Nicheless Color LED 12V JLU4C24W50</option>
                          <option>Nicheless Color LED 12V JLU4C6W100</option>
                          <option>Nicheless Color LED 12V JLU4C6W150</option>
                          <option>Nicheless Color LED 12V JLU4C6W50</option>
                          <option>
                            Nicheless Watercolors LED 10W 12V Accent
                          </option>
                          <option>Nicheless White LED 10W 12V Accent</option>
                          <option>Nicheless White LED 15W 12V Accent</option>
                          <option>WaterColors LED 120V Plastic Pool</option>
                          <option>WaterColors LED 120V Stainless Pool</option>
                          <option>WaterColors LED 12V Plastic Pool</option>
                          <option>WaterColors LED 12V Plastic Spa</option>
                          <option>WaterColors LED 12V Stainless Pool</option>
                          <option>WaterColors LED 12V Stainless Spa</option>
                          <option>White Light 100W 120V Plastic Pool</option>
                          <option>White Light 100W 120V Plastic Spa</option>
                          <option>White Light 100W 120V Stainless Pool</option>
                          <option>White Light 100W 120V Stainless Spa</option>
                          <option>White Light 100W 12V Plastic Pool</option>
                          <option>White Light 100W 12V Plastic Spa</option>
                          <option>White Light 100W 12V Stainless Pool</option>
                          <option>White Light 100W 12V Stainless Spa</option>
                          <option>White Light 300W 120V Plastic Pool</option>
                          <option>White Light 300W 120V Stainless Pool</option>
                          <option>White Light 300W 12V Plastic Pool</option>
                          <option>White Light 300W 12V Stainless Pool</option>
                          <option>White Light 500W 120V Plastic Pool</option>
                          <option>White Light 500W 120V Stainless Pool</option>
                          <option>White Light 500W 12V Plastic Pool</option>
                          <option>White Light 500W 12V Stainless Pool</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'PAL' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Lights' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>

                          <option>2L4 LED</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Lights' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>AmerBrite LED 120V Pool</option>
                          <option>AmerBrite LED 12V Pool</option>
                          <option>Amerlite 100W 12V Pool</option>
                          <option>Amerlite 300W 120V Pool</option>
                          <option>Amerlite 300W 12V Pool</option>
                          <option>Amerlite 400W 120V Pool</option>
                          <option>Amerlite 500W 120V Pool</option>
                          <option>AmerQuartz 200W 12V Pool</option>
                          <option>AmerQuartz 300W 120V Pool</option>
                          <option>AmerQuartz 500W 120V Pool</option>
                          <option>AmerQuartz 50W 12V Pool</option>
                          <option>AquaLight 100W 120V Pool</option>
                          <option>AquaLight 100W 12V Spa</option>
                          <option>AquaLight 250W 120V Pool</option>
                          <option>AquaLight 250W 12V Spa</option>
                          <option>AquaLight 75W 12V Spa</option>
                          <option>AquaLumin 120V Spa</option>
                          <option>AquaLumin 12V Spa</option>
                          <option>AquaLumin II 120V Spa</option>
                          <option>AquaLumin II 12V Spa</option>
                          <option>AquaLumin III 100W 12V Spa</option>
                          <option>AquaLumin III 250W 120V Spa</option>
                          <option>AquaLuminator</option>
                          <option>Color AquaLuminator (CAL)</option>
                          <option>FIBERworks Fiber 220W 19.7V Pool/Spa</option>
                          <option>FIBERworks Fiber 250W 24V Pool/Spa</option>
                          <option>GloBrite 100' 12v color</option>
                          <option>GloBrite 150' 12v color</option>
                          <option>GloBrite 30' 12v color</option>
                          <option>GloBrite 50' 12v color</option>
                          <option>GloBrite Color LED 12V Pool</option>
                          <option>GloBrite Color LED 12V Spa</option>
                          <option>GloBrite White LED 12V Pool</option>
                          <option>GloBrite White LED 12V Spa</option>
                          <option>HiLite 75W 12V Accent</option>
                          <option>IntelliBrite 100' 12v color</option>
                          <option>IntelliBrite 100' 12v white</option>
                          <option>IntelliBrite 150' 12v color</option>
                          <option>IntelliBrite 150' 12v white</option>
                          <option>IntelliBrite 30' 12v color</option>
                          <option>IntelliBrite 30' 12v white</option>
                          <option>IntelliBrite 50' 12v color</option>
                          <option>IntelliBrite 50' 12v white</option>
                          <option>IntelliBrite 5g Color LED 120V Pool</option>
                          <option>IntelliBrite 5g Color LED 120V Spa</option>
                          <option>IntelliBrite 5g Color LED 12V Pool</option>
                          <option>IntelliBrite 5g Color LED 12V Spa</option>
                          <option>
                            IntelliBrite 5g White LED 100W 120V Spa
                          </option>
                          <option>
                            IntelliBrite 5g White LED 100W 12V Spa
                          </option>
                          <option>
                            IntelliBrite 5g White LED 300W 120V Pool
                          </option>
                          <option>
                            IntelliBrite 5g White LED 300W 12V Pool
                          </option>
                          <option>
                            IntelliBrite 5g White LED 400W 120V Pool
                          </option>
                          <option>
                            IntelliBrite 5g White LED 400W 12V Pool
                          </option>
                          <option>
                            IntelliBrite 5g White LED 500W 120V Pool
                          </option>
                          <option>
                            IntelliBrite 5g White LED 500W 12V Pool
                          </option>
                          <option>IntelliBrite LED Pool</option>
                          <option>IntelliBrite LED Spa</option>
                          <option>Intellibrite Turtle Edition 150' 12v </option>
                          <option>MicroBrite 100' 12v color</option>
                          <option>MicroBrite 100' 12v white</option>
                          <option>MicroBrite 150' 12v color</option>
                          <option>MicroBrite 150' 12v white</option>
                          <option>MicroBrite 50' 12v color</option>
                          <option>MicroBrite 50' 12v white</option>
                          <option>PG2000 Fiber 150W Pool/Spa</option>
                          <option>Quasar</option>
                          <option>SpaBrite 100W 120V Spa</option>
                          <option>SpaBrite 100W 12V Spa</option>
                          <option>SpaBrite 250W 120V Spa</option>
                          <option>SpaBrite 60W 120V Spa</option>
                          <option>Spectrum Amerlite (SAM) 150W Pool</option>
                          <option>Spectrum Aqualight (SAL) 105W Spa</option>
                          <option>Spectrum Aqualight (SAL) 35W Spa</option>
                          <option>SunBrite 100W 12V Spa</option>
                          <option>SunBrite II 100W 12V Spa</option>
                          <option>SunBrite II 300W 120V Spa</option>
                          <option>SunBrite II 50W 12V Spa</option>
                          <option>SunGlow 300W 12V Pool</option>
                          <option>SunGlow 500W 120V Pool</option>
                          <option>SunGlow II 300W 120V Pool</option>
                          <option>SunGlow II 300W 12V Pool</option>
                          <option>SunGlow II 500W 120V Pool</option>
                          <option>SunLite 100W 120V Spa</option>
                          <option>SunLite 250W 130V Spa</option>
                          <option>SunLite 75W 12V Spa</option>
                          <option>SunStar 50W 12V Pool</option>
                          <option>SwimQuip 300W 12V Pool</option>
                          <option>SwimQuip 500W 120V Pool</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Anthony' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Bronze 1 1/2 HP</option>
                          <option>Bronze 1 HP</option>
                          <option>Bronze 2 HP</option>
                          <option>Bronze 3/4 HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Aqua-Flo' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Everbilt' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            1.5-HP 230/115-Volt In-Ground Pool Pump with
                            Protector Technology
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Harris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>ProForce 1.5HP</option>
                          <option>ProForce 1HP</option>
                          <option>Other</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jacuzzi' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
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
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 2 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 3 HP
                          </option>
                          <option>
                            WhisperFlo Energy Efficient Full Rated 3/4 HP
                          </option>
                          <option>WhisperFlo High Performance 1 1/2 HP</option>
                          <option>WhisperFlo High Performance 1 HP</option>
                          <option>WhisperFlo High Performance 1/2 HP</option>
                          <option>WhisperFlo High Performance 2 1/2 HP</option>
                          <option>WhisperFlo High Performance 2 HP</option>
                          <option>WhisperFlo High Performance 3 HP</option>
                          <option>WhisperFlo High Performance 3/4 HP</option>
                          <option>
                            WhisperFlo Standard Full Rated 1 1/2 HP
                          </option>
                          <option>WhisperFlo Standard Full Rated 1 HP</option>
                          <option>WhisperFlo Standard Full Rated 1/2 HP</option>
                          <option>WhisperFlo Standard Full Rated 2 HP</option>
                          <option>WhisperFlo Standard Full Rated 3 HP</option>
                          <option>WhisperFlo Standard Full Rated 3/4 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 1 1/2 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 1 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 2 HP</option>
                          <option>WhisperFlo TEFC Super-Duty 3 HP</option>
                          <option>
                            WhisperFlo Up Rated High Performance 1 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 1 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 2 1/2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 2 HP
                          </option>
                          <option>
                            WhisperFlo Up Rated High Performance 3/4 HP
                          </option>
                          <option>WhisperFlo XF 2 1/2 HP</option>
                          <option>WhisperFlo XF 2 HP</option>
                          <option>WhisperFlo XF 3 HP</option>
                          <option>WhisperFlo XF 5 HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Polaris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>PB4-60 3/4 HP Booster Pump</option>
                          <option>PB4SQ Booster Pump</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Premier' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Model 555N</option>
                          <option>Model 556N</option>
                          <option>Model 575N</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Sta-Rite' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Max-E-Pro</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Water Wizard' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>5-MSP 1200GPH 115V with 25' Cord</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Waterway' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Iron Might 1/15HP 3410030-1E</option>
                          <option>SMF-110 1HP</option>
                          <option>SMF-115 1.5HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'XtremepowerUS' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Pumps' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>2 Speed 1.5HP</option>
                          <option>2 Speed 2HP</option>
                          <option>2 Speed High-flo 2HP</option>
                          <option>Variable Speed 2HP</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Feherguard' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Reels' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Mobile Solar Reel</option>
                          <option>Premium Solar Reel</option>
                          <option>Surface Rider</option>
                          <option>Surface Rider II</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'GLI Corp' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Reels' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Commercial</option>
                          <option>Hurricane</option>
                          <option>Residential</option>
                          <option>Tidal Wave</option>
                          <option>Typhoon</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'A & A' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Max-E-Pro</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Anthony' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Quik Dek-Chlor</option>
                          <option>QuikPure 3 Dual Bulb</option>
                          <option>QuikPure 3 Single Bulb</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'AirSep' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Newlife Elite Oxygen Concentrator</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'AutoPilot' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>CoPilot RC-35/22 110V</option>
                          <option>CoPilot RC-35/22 220V</option>
                          <option>CoPilot RC-52</option>
                          <option>
                            PoolPilot AG RC-35/22 Inline Cell 115V
                          </option>
                          <option>
                            PoolPilot AG RC-35/22 Return Jet Cell 115V
                          </option>
                          <option>
                            PoolPilot AG RC-35/22 Swan Floater 115V
                          </option>
                          <option>PoolPilot Digital CC-15</option>
                          <option>PoolPilot Digital Nano RC-35/22 115V</option>
                          <option>PoolPilot Digital Nano RC-35/22 220V</option>
                          <option>PoolPilot Digital Nano+ RC-28 115V</option>
                          <option>PoolPilot Digital Nano+ RC-28 220V</option>
                          <option>PoolPilot Digital RC-35</option>
                          <option>PoolPilot Digital RC-42</option>
                          <option>PoolPilot Digital RC-52</option>
                          <option>PoolPilot Professional CC-15</option>
                          <option>PoolPilot Soft Touch CC-15</option>
                          <option>PoolPilot Soft Touch RC-35</option>
                          <option>PoolPilot Soft Touch RC-42</option>
                          <option>PoolPilot Soft Touch RC-52</option>
                          <option>SpaPilot Flush Mount</option>
                          <option>SpaPilot Wall Mount</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Biolab / Guardex' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Brominator Model 25163</option>
                          <option>Brominator Model 25165</option>
                          <option>Feeder Model MA 18</option>
                          <option>Feeder Model MA 36</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'ClearWater' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Aerous Oxygen Concentrator</option>
                          <option>CD10 Ozone Generator</option>
                          <option>CD12 Corona Discarge</option>
                          <option>CD15 Ozone Generator</option>
                          <option>CD30BX Ozone Generator</option>
                          <option>OCD11 Destruct System</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'CMP' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Powerclean Econ In-Line Chlorinator</option>
                          <option>
                            Powerclean Tab Econ VS In-Line Chlorinator
                          </option>
                          <option>Powerclean Tab Max; 15 LB</option>
                          <option>Powerclean Tab Max; 30 LB</option>
                          <option>Powerclean Tab Max; 40 LB</option>
                          <option>
                            Powerclean Tab Mini In-Line Chlorinator
                          </option>
                          <option>
                            Powerclean Tab Ultra In-Line Chlorinator with Base,
                            Clear Glass Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra In-Line Chlorinator with Base,
                            White Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra In-Line Chlorinator, Clear
                            Glass Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra In-Line Chlorinator, Clear
                            Plastic Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra In-Line Chlorinator, White Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            1.5"-2" Clamp Size, Clear Glass Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            1.5"-2" Clamp Size, Clear Plastic Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            1.5"-2" Clamp Size, White Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            2.5"-3" Clamp Size, Clear Glass Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            2.5"-3" Clamp Size, Clear Plastic Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra Off-Line Chlorinator with
                            2.5"-3" Clamp Size, White Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra VS In-Line Chlorinator, Clear
                            Glass Lid
                          </option>
                          <option>
                            Powerclean Tab Ultra VS In-Line Chlorinator, White
                            Lid
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Compu Pool' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>C-CPP 1000</option>
                          <option>C-CPP 1250</option>
                          <option>C-CPP 150</option>
                          <option>C-CPP 1500</option>
                          <option>C-CPP 1750</option>
                          <option>C-CPP 2000</option>
                          <option>C-CPP 250</option>
                          <option>C-CPP 2500</option>
                          <option>C-CPP 400</option>
                          <option>C-CPP 500</option>
                          <option>C-CPP 600</option>
                          <option>C-CPP 800</option>
                          <option>Compu-Chlor A-150 S</option>
                          <option>Compu-Chlor A-200 S</option>
                          <option>Compu-Chlor A-300 S</option>
                          <option>Compu-Chlor A-500 S</option>
                          <option>Compu-Chlor A-75 S</option>
                          <option>Compu-Chlor C-320 S</option>
                          <option>Compu-Chlor L-210 S</option>
                          <option>Compu-Chlor M-140 S</option>
                          <option>Compu-Chlor S-70 S</option>
                          <option>CPSC 08</option>
                          <option>CPSC 16</option>
                          <option>CPSC 24</option>
                          <option>CPSC 36</option>
                          <option>CPSC 48</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Del Ozone' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Big Dipper 120V</option>
                          <option>Big Dipper 230V</option>
                          <option>Eclipse 10</option>
                          <option>Eclipse 20</option>
                          <option>Eclipse 40</option>
                          <option>MCD 50 110V</option>
                          <option>MCD 50 220V</option>
                          <option>Solar Eclipse</option>
                          <option>Spa Eclipse</option>
                          <option>Spa Solar Eclipse</option>
                          <option>Spa Solar Eclipse Plus</option>
                          <option>Total Eclipse 2</option>
                          <option>Total Eclipse 4</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Delta UV' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>EL Lite 38 UV</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Eco-Matic' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Comm 1200</option>
                          <option>Comm 2400</option>
                          <option>Comm 4000</option>
                          <option>Comm 5500</option>
                          <option>ESC 16</option>
                          <option>ESC 24</option>
                          <option>ESC 36</option>
                          <option>ESC 48</option>
                          <option>ESC 6000 110V</option>
                          <option>ESC 6000 220V</option>
                          <option>ESC 7000 110V</option>
                          <option>ESC 7000 220V</option>
                          <option>ESC 8000 220V</option>
                          <option>ESC 9000 220V</option>
                          <option>ESC Max</option>
                          <option>ESC Max 100</option>
                          <option>ESR 16</option>
                          <option>ESR 24</option>
                          <option>ESR 36</option>
                          <option>ESR 48</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'EZ Clor' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Feeder Model R-3AF</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>AquaRite Pro T-15</option>
                          <option>AquaRite Pro T-3</option>
                          <option>AquaRite Pro T-9</option>
                          <option>AquaRite T-15</option>
                          <option>AquaRite T-3</option>
                          <option>AquaRite T-9</option>
                          <option>CAT 2000 Automated Controller</option>
                          <option>HydroRite UVO3</option>
                          <option>Model C1100CF</option>
                          <option>Model C1800CF</option>
                          <option>Model C250CF</option>
                          <option>Model C500CF</option>
                          <option>Model CL100 In-Line</option>
                          <option>Model CL100 Off-Line</option>
                          <option>Model CL110 In-Line</option>
                          <option>Model CL110 Off-Line</option>
                          <option>Model CL110BR In-Line</option>
                          <option>Model CL110BR Off-Line</option>
                          <option>Model CL200 In-Line</option>
                          <option>Model CL200 Off-Line</option>
                          <option>Model CL220 In-Line</option>
                          <option>Model CL220 Off-Line</option>
                          <option>Model CL220BR In-Line</option>
                          <option>Model CL220BR Off-Line</option>
                          <option>Saline C 6.0</option>
                          <option>Salt &amp; Swim 3C</option>
                          <option>Salt &amp; Swim 3C Pro</option>
                          <option>Sense &amp; Dispense</option>
                          <option>TurboCell GLX-CELL-15</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'IPS' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>M770 ORP pH Controller</option>
                          <option>M790 ORP pH Controller</option>
                          <option>M820 ORP pH Controller</option>
                          <option>M920 ORP pH Controller</option>
                          <option>M920CA ORP pH Controller</option>
                          <option>VidaPure ORP pH Controller</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jacuzzi' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>J-SC40H</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>AquaPure 1400</option>
                          <option>AquaPure 1400 3-Port</option>
                          <option>AquaPure 700</option>
                          <option>AquaPure 700 3-Port</option>
                          <option>AquaPure Ei</option>
                          <option>Chlormatic CM2-301</option>
                          <option>Chlormatic CM2-601</option>
                          <option>Chlormatic CM3-301</option>
                          <option>Chlormatic CM3-601</option>
                          <option>Clearwater C140</option>
                          <option>Clearwater C170</option>
                          <option>Clearwater C200</option>
                          <option>Clearwater C250</option>
                          <option>DuoClear 25</option>
                          <option>DuoClear 35</option>
                          <option>DuoClear 45</option>
                          <option>Express</option>
                          <option>Fusion</option>
                          <option>Fusion Soft</option>
                          <option>LM2-15</option>
                          <option>LM2-24</option>
                          <option>LM2-40</option>
                          <option>LM3-15</option>
                          <option>LM3-24</option>
                          <option>LM3-40</option>
                          <option>Nature 2 Express</option>
                          <option>Nature 2 Fusion</option>
                          <option>Nature 2 Soft</option>
                          <option>Professional G25</option>
                          <option>Professional G35</option>
                          <option>Professional G45</option>
                          <option>Pro-G Plus G25</option>
                          <option>Pro-G Plus G35</option>
                          <option>Pro-G Plus G45</option>
                          <option>TruClear</option>
                          <option>Watermatic G1000 Dichlor Feeder</option>
                          <option>Watermatic G7500 Cal-Hypo Feeder</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'King Technology' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Pool FROG Cycler 5400</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Nature2' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Mineral Purifier G52</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Paramount' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Chlorinator Power Clean</option>
                          <option>Ozone O3</option>
                          <option>Ultra UV Double Lamp</option>
                          <option>Ultra UV Single Lamp</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>BioShield UV</option>
                          <option>HC 3315</option>
                          <option>HC 3330</option>
                          <option>HC 3340</option>
                          <option>iChlor 15K</option>
                          <option>iChlor 30K</option>
                          <option>IntelliChlor IC15</option>
                          <option>IntelliChlor IC20</option>
                          <option>IntelliChlor IC30</option>
                          <option>IntelliChlor IC40</option>
                          <option>IntelliChlor IC60</option>
                          <option>Model 300</option>
                          <option>Model 300-19</option>
                          <option>Model 300-29</option>
                          <option>Model 300-29X</option>
                          <option>Model 302</option>
                          <option>Model 320</option>
                          <option>Model 322</option>
                          <option>Rainbow In-Line Chlorinator</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Rola-Chem' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Rola-Chem Pro Series Pump</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'SGS' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Breeze 320</option>
                          <option>Breeze 540</option>
                          <option>Breeze 760</option>
                          <option>SG 5000</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'SmartPool' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>ChlorEase</option>
                          <option>ChlorEase Ultra</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'SpectraLight' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>SL-500</option>
                          <option>SL-550</option>
                          <option>SL-620</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Super-pro' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Inline Chemical Feeder</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Watermaid' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>A3 Power Supply</option>
                          <option>A4 Power Supply</option>
                          <option>EZ300 1.5"</option>
                          <option>EZ300 2"</option>
                          <option>P100 Power Supply</option>
                          <option>QT100</option>
                          <option>QT300</option>
                          <option>QT400</option>
                          <option>SPA Cell</option>
                          <option>VTR300 1.5"</option>
                          <option>VTR300 2"</option>
                          <option>WM10 Power Supply</option>
                          <option>WN934A Power Supply</option>
                          <option>XT300 1.5"</option>
                          <option>XT300 2"</option>
                          <option>XT400 1.5"</option>
                          <option>XT400 2"</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Waterway' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            In-Line chlorinator, 12 tablet feeder, 2” socket x
                            2.5” spigot, CLC-012
                          </option>
                          <option>
                            In-Line chlorinator, 4 3” tabs, CA-G004-W
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Zodiac' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Sanitizers' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Nature2 Mineral Purifier W20176</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Anthony' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Bronze Push/Pull Backwash</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Baker Hydro' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Verti-Lever 2" Backwash</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>GM 400 Backwash</option>
                          <option>GM 600 Backwash</option>
                          <option>Push/Pull Slide Backwash</option>
                          <option>Selecta-Flo 2" Backwash</option>
                          <option>Vari-Flo 1.5" Backwash</option>
                          <option>Vari-Flo 2" Backwash</option>
                          <option>Vari-Flo 4-Position Backwash</option>
                          <option>Vari-Flo XL Backwash</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jacuzzi' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>DV 4 Backwash</option>
                          <option>DV 6 Backwash</option>
                          <option>DV 7 Backwash</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Backwash Valve BWVL-MPV-80</option>
                          <option>Ball Valve 1" Non-Union</option>
                          <option>Ball Valve 1.5" Non-Union</option>
                          <option>Ball Valve 1.5" Union</option>
                          <option>Ball Valve 2" Non-Union</option>
                          <option>Ball Valve 2" Union</option>
                          <option>Ball Valve 3" Non-Union</option>
                          <option>Ball Valve 3/4" Non-Union</option>
                          <option>Ball Valve 4" Non-Union</option>
                          <option>Gray Valve 1.5" 2-Port Diverter</option>
                          <option>Gray Valve 1.5" 3-Port Diverter</option>
                          <option>
                            Gray Valve 1.5" 3-Port Non-Positive Seal Diverter
                          </option>
                          <option>Gray Valve 2" 2-Port Diverter</option>
                          <option>Gray Valve 2" 3-Port Diverter</option>
                          <option>
                            Gray Valve 2" 3-Port Non-Positive Seal Diverter
                          </option>
                          <option>JVA 2444 Actuator</option>
                          <option>Neverlube 1" 3-Port Diverter</option>
                          <option>Neverlube 1.5" 2-Port Diverter</option>
                          <option>Neverlube 1.5" 3-Port Diverter</option>
                          <option>Neverlube 2" 2-Port Diverter</option>
                          <option>Neverlube 2" 3-Port Diverter</option>
                          <option>Neverlube 2.5" 2-Port Diverter</option>
                          <option>Neverlube 2.5" 3-Port Diverter</option>
                          <option>Neverlube Backwash</option>
                          <option>Push/Pull Slide Backwash</option>
                          <option>Spacesaver 1.5" 2-Port Diverter</option>
                          <option>
                            Spacesaver 1.5" 2-Port Non-Positive Seal Diverter
                          </option>
                          <option>Spacesaver 1.5" 3-Port Diverter</option>
                          <option>Spring 1.5" 90 Check</option>
                          <option>Spring 1.5" Straight Check</option>
                          <option>Spring 2" 90 Check</option>
                          <option>Spring 2" Straight Check</option>
                          <option>Spring 2.5" Straight Check</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Valves' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>American Side Mount MPV 1.5" Backwash</option>
                          <option>American Side Mount MPV 2" Backwash</option>
                          <option>
                            American Top Mount 5 Position Backwash
                          </option>
                          <option>
                            American Top Mount 6 Position Backwash
                          </option>
                          <option>
                            American Top Mount 8 Position Backwash
                          </option>
                          <option>Compool 1.5" 2-Way CPVC Diverter</option>
                          <option>Compool 1.5" 2-Way PVC Diverter</option>
                          <option>Compool 1.5" 3-Way CPVC Diverter</option>
                          <option>Compool 1.5" 3-Way PVC Diverter</option>
                          <option>Compool 2" 2-Way CPVC Diverter</option>
                          <option>Compool 2" 2-Way PVC Diverter</option>
                          <option>Compool 2" 3-Way CPVC Diverter</option>
                          <option>Compool 2" 3-Way PVC Diverter</option>
                          <option>Compool 2" 3-Way Solar CPVC Diverter</option>
                          <option>Compool 2" CPVC Check</option>
                          <option>CVA 24 Actuator</option>
                          <option>FullFlow Slide DE Backwash</option>
                          <option>FullFlow Slide Sand Backwash</option>
                          <option>
                            FullFlowXF 2.5" 2-Way 90 CPVC Diverter
                          </option>
                          <option>FullFlowXF 2.5" 2-Way CPVC Diverter</option>
                          <option>FullFlowXF 2.5" 3-Way CPVC Diverter</option>
                          <option>
                            FullFlowXF 2.5" 3-Way Solar CPVC Diverter
                          </option>
                          <option>FullFlowXF 2.5" 90 CPVC Check</option>
                          <option>FullFlowXF 2.5" CPVC Check</option>
                          <option>FullFlowXF DE Backwash</option>
                          <option>FullFlowXF Sand Backwash</option>
                          <option>HiFlow 1.5" Backwash</option>
                          <option>HiFlow 2" Backwash</option>
                          <option>PacFab MPV 1.5" Backwash</option>
                          <option>PacFab MPV 2" Backwash</option>
                          <option>Push/Pull Slide ABS 2" Backwash</option>
                          <option>Push/Pull Slide PVC 2" Backwash</option>
                          <option>
                            Sta-Rite Push/Pull Bronze 1.5" Backwash
                          </option>
                          <option>Sta-Rite Push/Pull Bronze 2" Backwash</option>
                          <option>Sta-Rite Push/Pull Plastic Backwash</option>
                          <option>
                            Sta-Rite Side Mount MPV 1.5" P/N:14964 Backwash
                          </option>
                          <option>
                            Sta-Rite Side Mount MPV 1.5" P/N:18201 Backwash
                          </option>
                          <option>
                            Sta-Rite Side Mount MPV 1.5" P/N:18202 Backwash
                          </option>
                          <option>
                            Sta-Rite Side Mount MPV 2" P/N:WC212 Backwash
                          </option>
                          <option>
                            Sta-Rite Top Mount MPV 1.5" P/N:WC112 Backwash
                          </option>
                          <option>
                            Sta-Rite Top Mount MPV 2" P/N:14971 Backwash
                          </option>
                          <option>
                            Sta-Rite Waterford Sand Filter Backwash
                          </option>
                          <option>SwimQuip Push/Pull Bronze Backwash</option>
                          <option>SwimQuip Push/Pull Plastic Backwash</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Air Supply' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Water Features' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Silencer 1 1/2HP 120V</option>
                          <option>Silencer 1 1/2HP 240V</option>
                          <option>Silencer 1HP 120V</option>
                          <option>Silencer 1HP 240V</option>
                          <option>Silencer 2HP 120V</option>
                          <option>Silencer 2HP 240V</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Jandy' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Water Features' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            Polaris Metal Blower 1 1/2HP 120V Bottom Mount
                          </option>
                          <option>
                            Polaris Metal Blower 1 1/2HP 120V Side Mount
                          </option>
                          <option>
                            Polaris Metal Blower 1 1/2HP 240V Bottom Mount
                          </option>
                          <option>
                            Polaris Metal Blower 1HP 120V Bottom Mount
                          </option>
                          <option>
                            Polaris Metal Blower 1HP 240V Bottom Mount
                          </option>
                          <option>
                            Polaris Metal Blower 2HP 120V Bottom Mount
                          </option>
                          <option>
                            Polaris Metal Blower 2HP 240V Bottom Mount
                          </option>
                          <option>Polaris QT 1 1/2HP 120V</option>
                          <option>Polaris QT 1 1/2HP 240V</option>
                          <option>Polaris QT 1HP 120V</option>
                          <option>Polaris QT 1HP 240V</option>
                          <option>Polaris QT 2HP 120V</option>
                          <option>Polaris QT 2HP 240V</option>
                          <option>WaterStars</option>
                          <option>WaterStars WF</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Water Features' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Deck Jet</option>
                          <option>Deck Jet II</option>
                          <option>MagicStream Laminar</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Polaris' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'Water Features' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>
                            QT Spa Blower - Quiet Bottom Exhaust, 2 HP, 240V
                          </option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'A & A' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>QuikSkim Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Aquastar' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Flow Star Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Baker Hydro' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Deluxe 100sq Cartridge Skimmer</option>
                          <option>Deluxe 35sq Cartridge Skimmer</option>
                          <option>Deluxe 50sq Cartridge Skimmer</option>
                          <option>Deluxe 75sq Cartridge Skimmer</option>
                          <option>Standard Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Hayward' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>SF400 Skimmer</option>
                          <option>SP1030 Main Drain</option>
                          <option>SP1048 Main Drain</option>
                          <option>SP1051 Main Drain</option>
                          <option>SP1051AV Main Drain</option>
                          <option>SP1053AV Main Drain</option>
                          <option>SP1070 Skimmer</option>
                          <option>SP1071 Skimmer</option>
                          <option>SP1075 Skimmer</option>
                          <option>SP1075T Skimmer</option>
                          <option>SP1076 Skimmer</option>
                          <option>SP1077 Skimmer</option>
                          <option>SP1082 Skimmer</option>
                          <option>SP1083 Skimmer</option>
                          <option>SP1084 Skimmer</option>
                          <option>SP1085 Skimmer</option>
                          <option>SP1086 Skimmer</option>
                          <option>SP1094 Skimmer</option>
                          <option>SP1094H Skimmer</option>
                          <option>SP1094SPA Skimmer</option>
                          <option>SP1095M Skimmer</option>
                          <option>SP1096 Skimmer</option>
                          <option>SP1097 Skimmer</option>
                          <option>SP1098 Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Paralevel' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Autofill Beige</option>
                          <option>Autofill White</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Pentair' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Admiral S15 Skimmer</option>
                          <option>Admiral S20 Skimmer</option>
                          <option>Autofill Fluidmaster T40 Black</option>
                          <option>Autofill Fluidmaster T40 Dark Gray</option>
                          <option>Autofill Fluidmaster T40 Gray</option>
                          <option>Autofill Fluidmaster T40 Tan</option>
                          <option>Autofill Fluidmaster T40 White</option>
                          <option>Bermuda Skimmer</option>
                          <option>FAS 100 Aboveground Skimmer</option>
                          <option>HydroSkim Skimmer</option>
                          <option>SkimClean Skimmer</option>
                          <option>U-3 Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Super-Pro' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Autofill Super-Pro Tan</option>
                          <option>Other</option>
                        </Fragment>
                      )}

                    {itemsList[
                      itemsList.findIndex(
                        e => e.itentifier === `${item.itentifier}`
                      )
                    ].make === 'Waterway' &&
                      itemsList[
                        itemsList.findIndex(
                          e => e.itentifier === `${item.itentifier}`
                        )
                      ].category === 'White Goods' && (
                        <Fragment>
                          <option disabled selected>
                            Choose One
                          </option>
                          <option>Renegade Skimmer</option>
                          <option>Other</option>
                        </Fragment>
                      )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CustomManager;
