import json
import random

def randomize_diamond_data(num_stones=30):
    # Define realistic ranges and options for diamond attributes
    shapes = ["Round", "Princess", "Oval", "Marquise", "Pear", "Cushion", "Emerald", "Radiant", "Asscher", "Heart"]
    colors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    clarities = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
    cuts = ["EX", "VG", "GD", "FR", "PR"]
    fluorescence = ["None", "FNT", "MED", "STG", "VST"]
    labs = ["GIA", "IGI", "HRD"]
    locations = ["New York", "India", "Dubai", "Hong Kong", "Thailand"]
    
    
    stones = []
    
    for i in range(num_stones):
        # Randomize carat weight between 0.5 and 3.0
        carat = round(random.uniform(0.5, 3.0), 2)
        
        # Generate realistic price and discount
        base_rap = random.randint(5000, 15000)
        discount = random.randint(30, 60)
        price_per_carat = round(base_rap * (100 - discount) / 100)
        total_price = round(price_per_carat * carat)
        
        # Generate realistic proportions
        table = round(random.uniform(54.0, 60.0), 1)
        depth = round(random.uniform(60.0, 63.0), 1)
        crown = round(random.uniform(14.0, 16.5), 1)
        pavilion = round(random.uniform(42.0, 44.0), 1)
        
        # Generate realistic measurements
        base_size = (carat ** (1/3)) * 6.5
        length = round(base_size + random.uniform(-0.2, 0.2), 2)
        width = round(base_size + random.uniform(-0.2, 0.2), 2)
        height = round(base_size * 0.6 + random.uniform(-0.1, 0.1), 2)
        
        stone = {
            "stoneno": str(i + 1),
            "certificateno": str(random.randint(1000000, 9999999)),
            "shape": random.choice(shapes),
            "carat": str(carat),
            "color": random.choice(colors),
            "clarity": random.choice(clarities),
            "rap": str(base_rap),
            "disc": str(discount),
            "pricepercarat": str(price_per_carat),
            "price": str(total_price),
            "cut": random.choice(cuts),
            "polish": random.choice(cuts),
            "symmetry": random.choice(cuts),
            "fluorescence": random.choice(fluorescence),
            "lab": random.choice(labs),
            "comment": "None",
            "eye": "Eye Clean" if random.random() > 0.2 else "Slightly Included",
            "table": str(table),
            "depth": str(depth),
            "crown": str(crown),
            "pavilion": str(pavilion),
            "length": str(length),
            "width": str(width),
            "height": str(height),
            "gurdle": random.choice(["Thin", "Medium", "Slightly Thick", "Thick"]),
            "culet": random.choice(["None", "Very Small", "Small"]),
            "ratio": str(round(length/width, 2)),
            "location": random.choice(locations)
        }
        stones.append(stone)
    
    return {"stones": stones}

# Generate new randomized data
randomized_data = randomize_diamond_data(30)

# Convert to JSON string with proper formatting
json_output = json.dumps(randomized_data, indent=2)

print(json_output)