import json
import os

def extract_unique_values(input_file, output_file):
    """
    Extract unique values for specified fields from diamond data JSON file.
    
    Args:
        input_file (str): Path to input JSON file
        output_file (str): Path to output JSON file
    """
    # Fields to track
    unique_values = {
        "Shape": set(),
        "Color": set(),
        "Intensity": set(),
        "Overtone": set(),
        "FancyColor": set(),
        "Clarity": set(),
        "FromToCtsSize": set(),
        "FromCts": set(),
        "ToCts": set(),
        "Cut": set(),
        "Polish": set(),
        "Symm": set(),
        "FLR": set(),
        "HNA": set(),
        "EyeClean": set(),
        "LAB": set(),
        "Location": set()
    }
    
    try:
        # Read the input JSON file
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Collect unique values for each field
        for diamond in data.get("UserData", []):
            for field in unique_values:
                # Handle special case for FromToCtsSize
                if field == "FromToCtsSize" and "Carats" in diamond:
                    unique_values[field].add(str(diamond.get("Carats", "")))
                # Handle special cases for FromCts and ToCts
                elif field in ["FromCts", "ToCts"] and "Carats" in diamond:
                    unique_values[field].add(str(diamond.get("Carats", 0)))
                else:
                    value = diamond.get(field, "")
                    if value:  # Only add non-empty values
                        unique_values[field].add(str(value))
        
        # Convert sets to sorted lists and create output dictionary
        output_data = {}
        for field, values in unique_values.items():
            # Convert to list, sort, and join with commas
            sorted_values = sorted(list(values))
            output_data[field] = ", ".join(sorted_values) if sorted_values else ""
        
        # Write the results to output file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2)
            
        # Print results to console
        print("Unique values for each field:")
        for field, values in output_data.items():
            print(f"\n{field}:")
            print(values if values else "No values found")
            
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{input_file}'")
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}")

# Example usage
if __name__ == "__main__":
    input_file = "data.json"
    output_file = "unique_diamond_values.json"
    extract_unique_values(input_file, output_file)