# Milestones for Great Barrier Reef Globe



# Milestone 1 - SATELLITE LIVE
This is by far the biggest portion of work but once complete it'll serve as a base for everything else

#### Initial Globe Setup
- three.js globe with a system to easily map between texture and long-lat coordinates
- Earth base texture layers including albedo maps
- Lighting

**Estimate**
4-6 hours

----

#### Advanced Globe Visuals
- Atmosphere shader
- Improve sea appearance with shaders
- Improve cloud appearance with volumetric clouds
- Potentially improve land appearance with normal map
- Motion blur when the globe is rotated

** This may be distributed over the course of the project **

**Estimate**
2-4 days

----

#### Wind data and particle trails
- Nullschool style wind data particle trails (without the delay on rotate)
- Potentially a set of particles and trails for ocean currents

**Estimate**
1 day

----

#### Heat Maps
- Ocean temperature
- Ocean currents
- *And any other datasets*

**Estimate**
1-4 hours (depends on data format)

----

### Total Milestone Time 4-6 days


&nbsp;


# Milestone 2 - SEE A SEASON

#### Data
- Convert data into heatmaps
- Convert heatmaps into video

**Estimate**
4-12 hours (depends on how the NOAH is formatted)

----

#### Control and Rendering
- Project heatmap videos stream onto globe
- Create an interface to allow fine-grained control of timelaps

**Estimate**
3-4 hours

----

### Total Milestone Time 1-2 days


&nbsp;


# Milestone 3 - SEE A CYCLONE

#### Data
- Process wind vector data for cylone

**Estimate**
1-4 hours 

----

#### Interface and Rendering
- Rendering using the particle trails system
- Potentially adding in cloud advection
- Potentially with a heatmap if it improves the effect

**Estimate**
2-8 hours (depends on how nice we want it to look)

----

### Total Milestone Time 1-1½ days


&nbsp;


# Milestone 4 - ANIMAL ODYSSEYS

#### Data
- Creating visually appealing but accurate paths from the images
	- Shearwater birds
	- Green Turtles + tiger sharks
	- Dwarfe Minke Whale

**Estimate**
2-4 hours

----

#### Path rendering
- Colored ribbons that extend across the surface
- *Or a similar effect that looks great*

**Estimate**
2-4 hours

----

### Total Milestone Time 1 day


&nbsp;


# Milestone 5 - COTS INVASION

#### Data
- Processing COTS and coral data, sorting out the coordinates, creating heatmaps
- Creating video of heatmaps

**Estimate**
4-8 hours (depends on data format)

----

#### Rendering and Interface
- Either using heatmaps for both or markers for COTS and heatmap for coral
- Timelapse animation of data with interface

**Estimate**
4-7 hours

----

### Total Milestone Time 1-2 days


&nbsp;


# Milestone 6 - ALGAE BLOOM

#### Data
- Creating heatmaps from data
- Creating video of heatmaps

**Estimate**
2-6 hours (depends on data format)

#### Rendering
- Heatmap animation with COTS and algae (should be fairly easy to do by this point)
- Interface

**Estimate**
1-2 hours

----

### Total Milestone Time <1 day


&nbsp;


# Milestone 7 - *DRAIN THE OCEANS

#### Decide Approach
- We could either do a prerendered video stream projected onto the globe of the oceans draining, or a simulation using a height map for Earth
- I think a height map based simulation might be the best way to go but if you can develop a prerendered video in-house that would save a lot of time
- Height-map approach would take a few days
- In any case, this will require specialized assets
- Prerendering would bring the implementation down to a day or so
- This needs further discussion
