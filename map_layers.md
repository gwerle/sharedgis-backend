* required

- roads (line)
  - id*: string
  - name*: string
  - way: enum
  - slope: enum
  - paved: boolean
  - road_condition: enum (excelent, good, intermediate, horrible)
  - havePublicTransportation: boolean
  - geom

- train (line)
  - id*: string;
  - geom

- train_cross (point)
  - id*: string
  - have visual alert: boolean;
  - have sound alert: boolean;
  - have far visibility of the train line: boolean;
  - geom

- bicycle_path (line)
  - id*: string;
  - surface situation: enum (excelent, good, intermediate, bad, very bad, horrible, very horrible, impassable)
  - type: enum (ciclovia, ciclorrota, ciclofaixa, compartilhado com pedestres)
  - geom

- bike_park (point)
  - id*: string
  - bike_racks_conditions: enum (good, medium, bad)
  - geom

- bike_support_point (point)
  - id*: string;
  - have_pump_tire_bomb: boolean;
  - have_food_to_sell: boolean;
  - have_bike_suport_parts: boolean;
  - geom

- taxi_stop (point)
  - id*: string;
  - have_seats: boolean;
  - have_visual_notification: boolean;
  - have_sound_notification: boolean;
  - accessible to wheelchair: boolean;
  - geom

- traffic_light (point)
  - id*: string
  - have sound notification: boolean
  - have visual notification to cross: boolean
  - have crosswalk
  - geom

- accessibility_ramp (point)
  - id*: string
  - inclination: enum (small, medium, high)
  - have vision notification: boolean
  - geom

- sidewalk (line)
  - id*: string
  - sides: enum (both, right, left)
  - surface: enum (asphalt, concrete, paving stones, sett, compacted, ground, grass)
  - surface situation: enum (excelent, good, intermediate, bad, very bad, horrible, very horrible, impassable)
  - width: double
  - have tactile paving: boolean
  - contrasted tactile paving: boolean
  - tactile paving color: string
  - tactile paving situation: enum (good, medium, bad)
  - geom

- sidewalk_obstacle (point)
  - id*: string
  - geom

- bus_stop (point)
  - id*: string;
  - wheelchair accessible: boolean;
  - visual indication: boolean;
  - sound indication: boolean;
  - rain covered: boolean;
  - have bus lines demonstrations: boolean;
  - have seat: boolean;
  - geom

